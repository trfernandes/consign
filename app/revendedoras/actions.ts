"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/auth/dal";
import { prisma } from "@/lib/prisma";
import { validarCpf } from "@/lib/validation/cpf";
import { validarTelefone } from "@/lib/validation/telefone";
import { createGoogleGeocodeClient } from "@/lib/geocoding/geocode";
import { DiaSemana } from "@/app/generated/prisma/client";

const disponibilidadeSchema = z.object({
  diaSemana: z.nativeEnum(DiaSemana),
  horaInicio: z.string().regex(/^\d{2}:\d{2}$/, "Horário inválido."),
  horaFim: z.string().regex(/^\d{2}:\d{2}$/, "Horário inválido."),
});

const vinculoSchema = z.object({
  funcionarioResponsavelId: z.string().min(1).optional(),
  disponibilidades: z
    .array(disponibilidadeSchema)
    .min(1, "Informe ao menos um horário de disponibilidade."),
});

const pessoaSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório."),
  cpf: z.string().refine(validarCpf, "CPF inválido."),
  telefone: z.string().refine(validarTelefone, "Telefone inválido."),
  pontoReferencia: z.string().optional(),
  rua: z.string().min(1, "Rua é obrigatória."),
  numero: z.string().min(1, "Número é obrigatório."),
  bairro: z.string().min(1, "Bairro é obrigatório."),
  cidade: z.string().min(1, "Cidade é obrigatória."),
  estado: z.string().length(2, "Estado deve ter 2 letras."),
  cep: z.string().min(1, "CEP é obrigatório."),
});

const revendedoraCompletaSchema = pessoaSchema.merge(vinculoSchema);

export type RevendedoraState = { error?: string; success?: boolean } | undefined;

export type BuscaCpfResult =
  | { encontrada: true; revendedoraId: string; nome: string }
  | { encontrada: false };

export async function buscarRevendedoraPorCpf(cpf: string): Promise<BuscaCpfResult> {
  await requireRole(["GESTOR", "FUNCIONARIO"]);

  const digitos = cpf.replace(/\D/g, "");
  if (!validarCpf(digitos)) {
    return { encontrada: false };
  }

  const revendedora = await prisma.revendedora.findUnique({ where: { cpf: digitos } });
  if (!revendedora) {
    return { encontrada: false };
  }

  return { encontrada: true, revendedoraId: revendedora.id, nome: revendedora.nome };
}

function parseVinculoFormData(formData: FormData) {
  return vinculoSchema.safeParse({
    funcionarioResponsavelId: formData.get("funcionarioResponsavelId") || undefined,
    disponibilidades: JSON.parse((formData.get("disponibilidades") as string) || "[]"),
  });
}

function parseCompletaFormData(formData: FormData) {
  return revendedoraCompletaSchema.safeParse({
    nome: formData.get("nome"),
    cpf: formData.get("cpf"),
    telefone: formData.get("telefone"),
    pontoReferencia: formData.get("pontoReferencia") || undefined,
    rua: formData.get("rua"),
    numero: formData.get("numero"),
    bairro: formData.get("bairro"),
    cidade: formData.get("cidade"),
    estado: formData.get("estado"),
    cep: formData.get("cep"),
    funcionarioResponsavelId: formData.get("funcionarioResponsavelId") || undefined,
    disponibilidades: JSON.parse((formData.get("disponibilidades") as string) || "[]"),
  });
}

async function geocodeEndereco(endereco: {
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
}) {
  const client = createGoogleGeocodeClient(process.env.GOOGLE_MAPS_API_KEY!);
  return client.geocode(endereco);
}

export async function createRevendedora(
  _state: RevendedoraState,
  formData: FormData
): Promise<RevendedoraState> {
  const funcionario = await requireRole(["GESTOR", "FUNCIONARIO"]);

  const revendedoraIdExistente = formData.get("revendedoraId") as string | null;

  if (revendedoraIdExistente) {
    const parsed = parseVinculoFormData(formData);
    if (!parsed.success) {
      return { error: parsed.error.issues[0].message };
    }
    const data = parsed.data;

    const revendedora = await prisma.revendedora.findUnique({ where: { id: revendedoraIdExistente } });
    if (!revendedora) {
      return { error: "Revendedora não encontrada." };
    }

    const funcionarioResponsavelId =
      funcionario.role === "GESTOR" ? (data.funcionarioResponsavelId ?? funcionario.id) : funcionario.id;

    try {
      await prisma.carteiraRevendedora.create({
        data: {
          revendedoraId: revendedoraIdExistente,
          empresaId: funcionario.empresaId,
          funcionarioResponsavelId,
          disponibilidades: { create: data.disponibilidades },
        },
      });
    } catch (error) {
      if (error instanceof Error && error.message.includes("Unique constraint")) {
        return { error: "Esta revendedora já atende a sua empresa." };
      }
      throw error;
    }

    revalidatePath("/revendedoras");
    return { success: true };
  }

  const parsed = parseCompletaFormData(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const data = parsed.data;

  const funcionarioResponsavelId =
    funcionario.role === "GESTOR" ? (data.funcionarioResponsavelId ?? funcionario.id) : funcionario.id;

  const geocode = await geocodeEndereco(data);
  if (!geocode) {
    return { error: "Não foi possível localizar o endereço informado. Verifique e tente novamente." };
  }

  try {
    await prisma.$transaction(async (tx) => {
      const revendedora = await tx.revendedora.create({
        data: {
          nome: data.nome,
          cpf: data.cpf.replace(/\D/g, ""),
          telefone: data.telefone.replace(/\D/g, ""),
          pontoReferencia: data.pontoReferencia,
          rua: data.rua,
          numero: data.numero,
          bairro: data.bairro,
          cidade: data.cidade,
          estado: data.estado,
          cep: data.cep,
          latitude: geocode.latitude,
          longitude: geocode.longitude,
        },
      });

      await tx.carteiraRevendedora.create({
        data: {
          revendedoraId: revendedora.id,
          empresaId: funcionario.empresaId,
          funcionarioResponsavelId,
          disponibilidades: { create: data.disponibilidades },
        },
      });
    });
  } catch (error) {
    if (error instanceof Error && error.message.includes("Unique constraint")) {
      return { error: "Já existe uma revendedora cadastrada com esse CPF." };
    }
    throw error;
  }

  revalidatePath("/revendedoras");
  return { success: true };
}

async function carregarCarteiraDaEmpresa(carteiraId: string, empresaId: string) {
  return prisma.carteiraRevendedora.findFirst({
    where: { id: carteiraId, empresaId },
    include: { revendedora: true },
  });
}

export async function editRevendedora(
  carteiraId: string,
  _state: RevendedoraState,
  formData: FormData
): Promise<RevendedoraState> {
  const funcionario = await requireRole(["GESTOR", "FUNCIONARIO"]);

  const carteira = await carregarCarteiraDaEmpresa(carteiraId, funcionario.empresaId);
  if (!carteira) {
    return { error: "Revendedora não encontrada." };
  }
  if (funcionario.role === "FUNCIONARIO" && carteira.funcionarioResponsavelId !== funcionario.id) {
    return { error: "Você não tem permissão para editar esta revendedora." };
  }

  const parsed = parseCompletaFormData(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const data = parsed.data;
  const revendedora = carteira.revendedora;

  const enderecoMudou =
    data.rua !== revendedora.rua ||
    data.numero !== revendedora.numero ||
    data.bairro !== revendedora.bairro ||
    data.cidade !== revendedora.cidade ||
    data.estado !== revendedora.estado ||
    data.cep !== revendedora.cep;

  let latitude = revendedora.latitude;
  let longitude = revendedora.longitude;

  if (enderecoMudou) {
    const geocode = await geocodeEndereco(data);
    if (!geocode) {
      return { error: "Não foi possível localizar o endereço informado. Verifique e tente novamente." };
    }
    latitude = geocode.latitude;
    longitude = geocode.longitude;
  }

  const funcionarioResponsavelId =
    funcionario.role === "GESTOR"
      ? (data.funcionarioResponsavelId ?? carteira.funcionarioResponsavelId)
      : carteira.funcionarioResponsavelId;

  try {
    await prisma.$transaction(async (tx) => {
      await tx.revendedora.update({
        where: { id: revendedora.id },
        data: {
          nome: data.nome,
          cpf: data.cpf.replace(/\D/g, ""),
          telefone: data.telefone.replace(/\D/g, ""),
          pontoReferencia: data.pontoReferencia,
          rua: data.rua,
          numero: data.numero,
          bairro: data.bairro,
          cidade: data.cidade,
          estado: data.estado,
          cep: data.cep,
          latitude,
          longitude,
        },
      });

      await tx.carteiraRevendedora.update({
        where: { id: carteiraId },
        data: {
          funcionarioResponsavelId,
          disponibilidades: {
            deleteMany: {},
            create: data.disponibilidades,
          },
        },
      });
    });
  } catch (error) {
    if (error instanceof Error && error.message.includes("Unique constraint")) {
      return { error: "Já existe uma revendedora cadastrada com esse CPF." };
    }
    throw error;
  }

  revalidatePath("/revendedoras");
  return { success: true };
}

export async function desativarRevendedora(carteiraId: string): Promise<RevendedoraState> {
  const funcionario = await requireRole(["GESTOR", "FUNCIONARIO"]);

  const carteira = await carregarCarteiraDaEmpresa(carteiraId, funcionario.empresaId);
  if (!carteira) {
    return { error: "Revendedora não encontrada." };
  }
  if (funcionario.role === "FUNCIONARIO" && carteira.funcionarioResponsavelId !== funcionario.id) {
    return { error: "Você não tem permissão para desativar esta revendedora." };
  }

  await prisma.carteiraRevendedora.update({
    where: { id: carteiraId },
    data: { ativa: false },
  });

  revalidatePath("/revendedoras");
  return { success: true };
}

export async function reativarRevendedora(carteiraId: string): Promise<RevendedoraState> {
  const funcionario = await requireRole(["GESTOR", "FUNCIONARIO"]);

  const carteira = await carregarCarteiraDaEmpresa(carteiraId, funcionario.empresaId);
  if (!carteira) {
    return { error: "Revendedora não encontrada." };
  }
  if (funcionario.role === "FUNCIONARIO" && carteira.funcionarioResponsavelId !== funcionario.id) {
    return { error: "Você não tem permissão para reativar esta revendedora." };
  }

  await prisma.carteiraRevendedora.update({
    where: { id: carteiraId },
    data: { ativa: true },
  });

  revalidatePath("/revendedoras");
  return { success: true };
}

export async function reatribuirRevendedora(
  carteiraId: string,
  novoFuncionarioResponsavelId: string
): Promise<RevendedoraState> {
  const funcionario = await requireRole(["GESTOR"]);

  const carteira = await carregarCarteiraDaEmpresa(carteiraId, funcionario.empresaId);
  if (!carteira) {
    return { error: "Revendedora não encontrada." };
  }

  await prisma.carteiraRevendedora.update({
    where: { id: carteiraId },
    data: { funcionarioResponsavelId: novoFuncionarioResponsavelId },
  });

  revalidatePath("/revendedoras");
  return { success: true };
}

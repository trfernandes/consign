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

const revendedoraSchema = z.object({
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
  funcionarioResponsavelId: z.string().min(1).optional(),
  disponibilidades: z
    .array(disponibilidadeSchema)
    .min(1, "Informe ao menos um horário de disponibilidade."),
});

export type RevendedoraState = { error?: string; success?: boolean } | undefined;

function parseFormData(formData: FormData) {
  const raw = {
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
  };

  return revendedoraSchema.safeParse(raw);
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

  const parsed = parseFormData(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const data = parsed.data;

  const funcionarioResponsavelId =
    funcionario.role === "GESTOR"
      ? (data.funcionarioResponsavelId ?? funcionario.id)
      : funcionario.id;

  const geocode = await geocodeEndereco(data);
  if (!geocode) {
    return { error: "Não foi possível localizar o endereço informado. Verifique e tente novamente." };
  }

  try {
    await prisma.revendedora.create({
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
        funcionarioResponsavelId,
        disponibilidades: {
          create: data.disponibilidades,
        },
      },
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

export async function editRevendedora(
  id: string,
  _state: RevendedoraState,
  formData: FormData
): Promise<RevendedoraState> {
  const funcionario = await requireRole(["GESTOR", "FUNCIONARIO"]);

  const existente = await prisma.revendedora.findUnique({ where: { id } });
  if (!existente) {
    return { error: "Revendedora não encontrada." };
  }
  if (funcionario.role === "FUNCIONARIO" && existente.funcionarioResponsavelId !== funcionario.id) {
    return { error: "Você não tem permissão para editar esta revendedora." };
  }

  const parsed = parseFormData(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const data = parsed.data;

  const enderecoMudou =
    data.rua !== existente.rua ||
    data.numero !== existente.numero ||
    data.bairro !== existente.bairro ||
    data.cidade !== existente.cidade ||
    data.estado !== existente.estado ||
    data.cep !== existente.cep;

  let latitude = existente.latitude;
  let longitude = existente.longitude;

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
      ? (data.funcionarioResponsavelId ?? existente.funcionarioResponsavelId)
      : existente.funcionarioResponsavelId;

  try {
    await prisma.revendedora.update({
      where: { id },
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
        funcionarioResponsavelId,
        disponibilidades: {
          deleteMany: {},
          create: data.disponibilidades,
        },
      },
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

export async function desativarRevendedora(id: string): Promise<RevendedoraState> {
  const funcionario = await requireRole(["GESTOR", "FUNCIONARIO"]);

  const existente = await prisma.revendedora.findUnique({ where: { id } });
  if (!existente) {
    return { error: "Revendedora não encontrada." };
  }
  if (funcionario.role === "FUNCIONARIO" && existente.funcionarioResponsavelId !== funcionario.id) {
    return { error: "Você não tem permissão para desativar esta revendedora." };
  }

  await prisma.revendedora.update({
    where: { id },
    data: { ativa: false },
  });

  revalidatePath("/revendedoras");
  return { success: true };
}

export async function reativarRevendedora(id: string): Promise<RevendedoraState> {
  const funcionario = await requireRole(["GESTOR", "FUNCIONARIO"]);

  const existente = await prisma.revendedora.findUnique({ where: { id } });
  if (!existente) {
    return { error: "Revendedora não encontrada." };
  }
  if (funcionario.role === "FUNCIONARIO" && existente.funcionarioResponsavelId !== funcionario.id) {
    return { error: "Você não tem permissão para reativar esta revendedora." };
  }

  await prisma.revendedora.update({
    where: { id },
    data: { ativa: true },
  });

  revalidatePath("/revendedoras");
  return { success: true };
}

export async function reatribuirRevendedora(
  id: string,
  novoFuncionarioResponsavelId: string
): Promise<RevendedoraState> {
  await requireRole(["GESTOR"]);

  const existente = await prisma.revendedora.findUnique({ where: { id } });
  if (!existente) {
    return { error: "Revendedora não encontrada." };
  }

  await prisma.revendedora.update({
    where: { id },
    data: { funcionarioResponsavelId: novoFuncionarioResponsavelId },
  });

  revalidatePath("/revendedoras");
  return { success: true };
}

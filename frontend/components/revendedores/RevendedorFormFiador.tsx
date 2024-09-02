import { useForm, UseFormReturn } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import FormInput from "../forms/FormInput";
import FormTextArea from "../forms/FormTextArea";
import FormMaskedInput, { MaskType } from "../forms/FormMaskedInput";
import FormSelectList from "../forms/FormSelectList";
import { useState } from "react";
import FancyCheckBox from "../FancyCheckBox";
import { requiredRule } from "../../utils/FormConstantsAndTypes";

type RevendedorFormFiadorProps = {
  form: UseFormReturn<FormFiadorData, any, undefined>;
};

export type FormFiadorData = {
  nome: string;
  cpf: string;
  cel: string;
  logradouro: string;
  numero: string;
  bairro: string;
  complemento: string;
  estado: string;
  cidade: string;
  observacoes: string;
};

export default function RevendedorFormFiador({ form }: RevendedorFormFiadorProps) {
  const { control: controller } = useForm();

  const [haveFiador, setHaveFiador] = useState(false);

  return (
    <View style={styles.mainContainer}>
      <FancyCheckBox label="Tem Fiador?" onPress={(checked) => setHaveFiador(checked)} />
      {haveFiador ? (
        <View style={styles.formContainer}>
          <FormInput control={form.control} fieldName="nome" label="Nome" rules={[requiredRule]} />
          <FormMaskedInput
            control={form.control}
            fieldName="cpf"
            label="CPF"
            mask={MaskType.cpf}
            rules={[requiredRule]}
          />
          <FormMaskedInput
            control={form.control}
            fieldName="cel"
            label="Celular"
            mask={MaskType.phone}
            rules={[requiredRule]}
          />
          <FormInput control={form.control} fieldName="logradouro" label="Logradouro" rules={[requiredRule]} />
          <FormInput control={form.control} fieldName="numero" label="Número" rules={[requiredRule]} />
          <FormInput control={form.control} fieldName="bairro" label="Bairro" rules={[requiredRule]} />
          <FormInput control={form.control} fieldName="complemento" label="Complemento" />
          <FormInput control={form.control} fieldName="cidade" label="Cidade" rules={[requiredRule]} />
          <FormSelectList
            data={[
              "AC",
              "AL",
              "AM",
              "AP",
              "BA",
              "CE",
              "DF",
              "ES",
              "GO",
              "MA",
              "MG",
              "MS",
              "MT",
              "PA",
              "PB",
              "PE",
              "PI",
              "PR",
              "RJ",
              "RN",
              "RO",
              "RR",
              "RS",
              "SC",
              "SE",
              "SP",
              "TO",
            ]}
            control={form.control}
            fieldName="estado"
            label="Estado"
            rules={[requiredRule]}
          />
          <FormTextArea
            control={form.control}
            fieldName="observacoes"
            label="Observações"
            numberOfLines={3}
            maxLength={200}
          />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { gap: 10 },
  formContainer: { gap: 10 },
});

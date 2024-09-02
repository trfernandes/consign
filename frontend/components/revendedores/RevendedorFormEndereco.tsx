import { UseFormReturn, useWatch } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import FormInput from "../forms/FormInput";
import {
  dateAfter1900,
  dateBeforeTodayRule,
  requiredRule,
} from "../../utils/FormConstantsAndTypes";
import FormSelectList from "../forms/FormSelectList";
import FormCheckBox from "../forms/FormCheckBox";
import FormMaskedInput, {
  MaskType,
} from "../forms/FormMaskedInput";
import FormTextArea from "../forms/FormTextArea";

type RevendedorFormEnderecoProps = {
  form: UseFormReturn<FormEnderecoData, any, undefined>;
};

export type FormEnderecoData = {
  logradouro: string;
  numero: string;
  bairro: string;
  complemento: string;
  estado: string;
  cidade: string;
  casaAlugada: string;
  observacoes: string;
  dataAluguel: Date;
};

export default function RevendedorFormEndereco({
  form,
  form: { control },
}: RevendedorFormEnderecoProps) {
  const isAluguel = useWatch({ control: control, name: "casaAlugada" });

  return (
    <View style={styles.mainContainer}>
      <FormInput
        control={control}
        fieldName="logradouro"
        label="Logradouro"
        rules={requiredRule}
      />
      <FormInput
        control={control}
        fieldName="numero"
        label="Número"
        rules={requiredRule}
      />
      <FormInput
        control={control}
        fieldName="bairro"
        label="Bairro"
        rules={requiredRule}
      />
      <FormInput control={control} fieldName="complemento" label="Complemento" />
      <FormInput
        control={control}
        fieldName="cidade"
        label="Cidade"
        rules={requiredRule}
      />
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
        control={control}
        fieldName="estado"
        label="Estado"
        rules={requiredRule}
      />

      <FormCheckBox control={control} fieldName="casaAlugada" label="Aluguel" />

      {isAluguel === "0" || isAluguel === undefined ? (
        <></>
      ) : (
        <FormMaskedInput
          control={control}
          fieldName="dataAluguel"
          label="Data de entrada no aluguel"
          mask={MaskType.date}
          rules={
            isAluguel === "1"
              ? [requiredRule, dateBeforeTodayRule, dateAfter1900]
              : [dateBeforeTodayRule, dateAfter1900]
          }
        />
      )}

      <FormTextArea
        control={control}
        fieldName="observacoes"
        label="Observações"
        numberOfLines={3}
        maxLength={200}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { gap: 10 },
});

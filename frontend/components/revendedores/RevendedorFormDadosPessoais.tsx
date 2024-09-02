import { UseFormReturn } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import Avatar from "../Avatar";
import FormInput from "../forms/FormInput";
import FormMaskedInput, {
  MaskType,
} from "../forms/FormMaskedInput";
import {
  dateAfter1900,
  dateBeforeTodayRule,
  minLengthRule,
  requiredRule,
} from "../../utils/FormConstantsAndTypes";
import FormTextArea from "../forms/FormTextArea";

type RevendedorFormDadosPessoaisProps = {
  form: UseFormReturn<FormPessoalData, any, undefined>;
};

export type FormPessoalData = {
  nome: string;
  dataNascimento: Date;
  cpf: string;
  email: string;
  cel1: string;
  cel2: string;
  telefone: string;
  observacoes: string;
};

export default function RevendedorFormDadosPessoais({
  form: { control },
}: RevendedorFormDadosPessoaisProps) {
  return (
    <View style={styles.mainContainer}>
      <Avatar
        url="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
        size={120}
      />

      <FormInput
        control={control}
        fieldName="nome"
        label="Nome"
        rules={requiredRule}
      />
      <FormMaskedInput
        control={control}
        fieldName="dataNascimento"
        label="Data de Nascimento"
        mask={MaskType.date}
        rules={[requiredRule, dateBeforeTodayRule, dateAfter1900]}
      />
      <FormMaskedInput
        control={control}
        fieldName="cpf"
        label="CPF"
        mask={MaskType.cpf}
        rules={[requiredRule, minLengthRule]}
      />
      <FormInput control={control} fieldName="email" label="E-mail" isEmail />
      <FormMaskedInput
        control={control}
        fieldName="cel1"
        label="Celular 1"
        mask={MaskType.phone}
        rules={[requiredRule]}
      />
      <FormMaskedInput
        control={control}
        fieldName="cel2"
        label="Celular 2"
        mask={MaskType.phone}
      />
      <FormMaskedInput
        control={control}
        fieldName="telefone"
        label="Telefone"
        mask={MaskType.phone}
      />
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
  input: {
    color: "#555555",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    height: 35,
    paddingLeft: 14,
  },
});

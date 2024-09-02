import { Control, Controller, FieldPath, RegisterOptions } from "react-hook-form";
import { StyleSheet, Text, TextInputProps, View } from "react-native";
import { maskPhone, maskDate, maskCPF, maskCep } from "../../utils/masks";
import FancyInput, { FancyInputProps } from "../FancyInput";
import { isDateSameOrAfter, isDateSameOrBefore, isValidCpf, isValidDate } from "../../utils/FormFieldsValidations";
import {
  CAMPO_OBRIGATORIO_MESSAGE,
  dateAfter1900,
  dateBeforeTodayRule,
  FormFieldRules,
  MIN_AND_MAX_LENGTH_MESSAGE,
  MIN_LENGTH_MESSAGE,
  requiredRule,
} from "../../utils/FormConstantsAndTypes";
import FormFieldErrorText from "./FormFieldErrorText";

function maskValue(type: MaskType, value: string) {
  if (value === undefined) return "";

  if (type === MaskType.phone) {
    return maskPhone(value);
  }
  if (type === MaskType.date) {
    return maskDate(value);
  }
  if (type === MaskType.cpf) {
    return maskCPF(value);
  }
  if (type === MaskType.cep) {
    return maskCep(value);
  }
}

export enum MaskType {
  phone,
  cpf,
  cep,
  date,
}

type FormMaskedInputProps<T> = {
  control?: Control<T>;
  fieldName: FieldPath<T>;
  rules?: FormFieldRules[] | FormFieldRules | undefined;
  mask: MaskType;
  minLength?: number;
};

export default function FormMaskedInput<T>({
  control,
  fieldName,
  mask,
  label,
  rules,
  maxLength,
  minLength,
  ...props
}: FormMaskedInputProps<T> & TextInputProps & FancyInputProps) {
  let fieldRules: Omit<RegisterOptions<T, any>, "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"> = {};

  if (rules?.includes(requiredRule)) {
    fieldRules.required = { value: true, message: CAMPO_OBRIGATORIO_MESSAGE };
  }

  if (rules?.includes(requiredRule)) {
    fieldRules.minLength = {
      value: minLength,
      message: MIN_LENGTH_MESSAGE.replace("#VALUE#", minLength?.toString()),
    };
  }

  if (mask === MaskType.cpf) {
    fieldRules.validate = { cpf: (value) => isValidCpf(String(value)) };
    fieldRules.minLength = {
      value: 14,
      message: MIN_LENGTH_MESSAGE.replace("#VALUE#", "14"),
    };
  }

  if (mask === MaskType.phone) {
    fieldRules.minLength = {
      value: 15,
      message: MIN_AND_MAX_LENGTH_MESSAGE.replace("#VALUE#", "10"),
    };
    maxLength = 15;
  }

  if (mask === MaskType.date) {
    //REQUIRED
    fieldRules.validate = { date: (value) => isValidDate(String(value)) };

    //MIN LENGTH
    maxLength = 10;
    fieldRules.minLength = {
      value: maxLength,
      message: MIN_AND_MAX_LENGTH_MESSAGE.replace("#VALUE#", "10"),
    };

    //DATE BEFORE TODAY
    if (rules?.includes(dateBeforeTodayRule)) {
      fieldRules.validate = {
        dateBeforeToday: (value) => isDateSameOrBefore(String(value), new Date(), "data de hoje"),
        ...fieldRules.validate,
      };
    }

    //DATE AFTER 1900
    if (rules?.includes(dateAfter1900)) {
      fieldRules.validate = {
        dateAfter1900: (value) => isDateSameOrAfter(String(value), new Date("1900-01-01"), "01/01/1900"),
        ...fieldRules.validate,
      };
    }
  }

  return (
    <Controller
      control={control}
      name={fieldName}
      rules={fieldRules}
      render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
        <View>
          <FancyInput
            label={label}
            onBlur={onBlur}
            blurOnSubmit
            onChangeText={(text) => onChange(maskValue(mask, text))}
            value={maskValue(mask, String(value))}
            maxLength={maxLength}
            {...props}
          />
          <FormFieldErrorText error={error} />
        </View>
      )}
    />
  );
}

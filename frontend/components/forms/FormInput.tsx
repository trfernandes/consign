import { Control, Controller, FieldPath, RegisterOptions } from "react-hook-form";
import FancyInput, { FancyInputProps } from "../FancyInput";
import { StyleSheet, Text, TextInputProps, View } from "react-native";
import {
  CAMPO_OBRIGATORIO_MESSAGE,
  FormFieldRules,
  MIN_LENGTH_MESSAGE,
  requiredRule,
  minLengthRule,
} from "../../utils/FormConstantsAndTypes";
import { isValidMail } from "../../utils/FormFieldsValidations";
import FormFieldErrorText from "./FormFieldErrorText";

export type FormComponentProps<T> = {
  control?: Control<T>;
  fieldName: FieldPath<T>;
  error?: string;
  minLength?: number;
  isEmail?: boolean;
  rules?: FormFieldRules[] | FormFieldRules | undefined;
};

export default function FormInput<T>({
  control,
  fieldName,
  label,
  error,
  rules,
  minLength,
  isEmail,
  ...props
}: FormComponentProps<T> & TextInputProps & FancyInputProps) {
  let fieldRules: Omit<RegisterOptions<T, any>, "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"> = {};

  if (rules?.includes(requiredRule)) {
    fieldRules.required = { value: true, message: CAMPO_OBRIGATORIO_MESSAGE };
  }

  if (rules?.includes(minLengthRule)) {
    fieldRules.minLength = {
      value: minLength,
      message: MIN_LENGTH_MESSAGE.replace("#VALUE#", minLength.toString()),
    };
  }

  if (isEmail) {
    fieldRules.validate = { email: (value) => isValidMail(String(value)) };
  }

  return (
    <Controller
      control={control}
      name={fieldName}
      rules={fieldRules}
      render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
        <View>
          <FancyInput label={label} onBlur={onBlur} onChangeText={onChange} value={value?.toString()} {...props} />
          <FormFieldErrorText error={error} />
        </View>
      )}
    />
  );
}

import { Control, Controller, FieldPath, RegisterOptions } from "react-hook-form";
import { StyleSheet, TextInputProps, View } from "react-native";
import FancyInput, { FancyInputProps } from "../FancyInput";
import { FormComponentProps } from "./FormInput";
import FancySelectList, { FancySelectListProps } from "../FancySelectList";
import FormFieldErrorText from "./FormFieldErrorText";
import { CAMPO_OBRIGATORIO_MESSAGE, FormFieldRules, requiredRule } from "../../utils/FormConstantsAndTypes";

type FormSelectListProps = {
  rules?: FormFieldRules[] | FormFieldRules | undefined;
};

export default function FormSelectList<T>({
  control,
  fieldName,
  label,
  data,
  rules,
  ...props
}: FormSelectListProps & FormComponentProps<T> & FancySelectListProps) {
  let fieldRules: Omit<RegisterOptions<T, any>, "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"> = {};

  if (rules?.includes(requiredRule)) {
    fieldRules.required = { value: true, message: CAMPO_OBRIGATORIO_MESSAGE };
  }

  return (
    <Controller
      control={control}
      name={fieldName}
      rules={fieldRules}
      render={({ field: { onChange }, fieldState: { error } }) => (
        <View style={styles.mainContainer}>
          <FancySelectList label={label} data={data} setSelected={onChange} save="value" {...props} />
          <FormFieldErrorText error={error} />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({ mainContainer: { gap: 7 } });

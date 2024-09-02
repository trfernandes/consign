import { Control, Controller, FieldPath } from "react-hook-form";
import { TextInputProps } from "react-native";
import FancyInput, { FancyInputProps } from "../FancyInput";
import FancyTextArea from "../FancyTextArea";

type FormInputProps<T> = { control?: Control<T>; fieldName: FieldPath<T> };

export default function FormTextArea<T>({
  control,
  fieldName,
  label,
  ...props
}: FormInputProps<T> & TextInputProps & FancyInputProps) {
  return (
    <Controller
      control={control}
      name={fieldName}
      render={({ field: { onBlur, onChange, value } }) => (
        <FancyTextArea
          label={label}
          onBlur={onBlur}
          onChangeText={onChange}
          value={value?.toString()}
          {...props}
        />
      )}
    />
  );
}

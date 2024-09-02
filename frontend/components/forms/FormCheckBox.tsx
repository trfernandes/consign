// import { Controller, UseFormStateReturn } from "react-hook-form";
// import { ComponentFormProps } from "./FormBaseTextInput";

import { Control, Controller, FieldPath } from "react-hook-form";
import { FormComponentProps } from "./FormInput";
import BouncyCheckbox, { BouncyCheckboxProps } from "react-native-bouncy-checkbox";
import FancyCheckBox, { FancyCheckBoxProps } from "../FancyCheckBox";
import { StyleSheet, View } from "react-native";

// export type FormBaseLabeledCheckboxProps = ComponentFormProps & CheckboxProps;

// export function FormLabeledCheckBox({
//   fieldName,
//   controller,
//   validations,
//   label,
//   onChange,
//   onBlur,
//   value,
//   errors,
//   ...props
// }: FormBaseLabeledCheckboxProps & UseFormStateReturn<any>) {
//   return (
//     <Controller
//       control={controller}
//       name={fieldName}
//       render={({ field: { onChange, onBlur, value } }) => (
//         <XStack alignItems="center" gap="$4" flex={0}>
//           <Checkbox onBlur={onBlur} onCheckedChange={onChange} value={value} {...props}>
//             <Checkbox.Indicator>
//               <CheckIcon />
//             </Checkbox.Indicator>
//           </Checkbox>
//           <Label color={"$gray9Dark"}>{label}</Label>
//         </XStack>
//       )}
//     />
//   );
// }

export default function FormCheckBox<T>({
  control,
  fieldName,
  label,
  ...props
}: FormComponentProps<T> & FancyCheckBoxProps) {
  return (
    <Controller
      control={control}
      name={fieldName}
      render={({ field: { onBlur, onChange, value } }) => (
        <View>
          <FancyCheckBox
            label={label}
            isChecked={value === "1"}
            onPress={(checked) => onChange(checked ? "1" : "0")}
            onBlur={onBlur}
            {...props}
          />
        </View>
      )}
    />
  );
}

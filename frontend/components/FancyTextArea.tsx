import { StyleSheet, TextInputProps } from "react-native";
import FancyInput, { FancyInputProps } from "./FancyInput";

export default function FancyTextArea({
  maxLength,
  numberOfLines,
  ...props
}: FancyInputProps & TextInputProps) {
  return (
    <FancyInput
      multiline
      numberOfLines={numberOfLines}
      maxLength={maxLength}
      style={styles.input}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: { height: 140, verticalAlign: "top", padding: 12, fontFamily: "Montserrat_400Regular" },
});

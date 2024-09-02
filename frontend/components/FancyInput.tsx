import { RefAttributes } from "react";
import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";
import FancyText from "./FancyText";

export type FancyInputProps = {
  label?: string | undefined;
};

export default function FancyInput({
  label,
  style,
  ...props
}: FancyInputProps & TextInputProps & RefAttributes<TextInput>) {
  return (
    <View style={styles.mainContainer}>
      {label !== undefined && label.trim() !== "" ? (
        <FancyText style={styles.label} title={`${label}`} type="bodyMedium" />
      ) : null}
      <TextInput style={[styles.input, style]} {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { paddingBottom: 5 },
  label: {
    color: "#555555",
    fontSize: 10,
    marginBottom: 5,
    marginLeft: 2,
    fontFamily: "Montserrat_600SemiBold",
  },
  input: {
    color: "#555555",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    height: 42,
    paddingLeft: 14,
    fontSize: 13,
    fontFamily: "Montserrat_500Medium",
  },
});

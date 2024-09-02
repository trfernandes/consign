import { StyleSheet, Text, View } from "react-native";
import BouncyCheckbox, { BouncyCheckboxProps } from "react-native-bouncy-checkbox";
import FancyText from "./FancyText";

export type FancyCheckBoxProps = {
  label?: string;
};

export default function FancyCheckBox({
  label,
  isChecked,
  ...props
}: FancyCheckBoxProps & BouncyCheckboxProps) {
  return (
    <View style={styles.mainContainer}>
      <BouncyCheckbox
        fillColor="#0080ff"
        disableText
        text={label}
        textStyle={styles.checkboxText}
        {...props}
      />
      {label !== undefined && label.trim() !== "" ? (
        <FancyText
          style={[styles.label, isChecked ? { color: "#242424" } : { color: "gray" }]}
          title={`${label}`}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 15,
  },
  label: {
    fontSize: 14,
    backgroundColor: "white",
    // fontFamily: "Montserrat_400Regular",
  },
  checkboxText: { fontSize: 15, color: "#242424" },
});

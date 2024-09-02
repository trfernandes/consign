import { Button, StyleSheet, Text, View } from "react-native";
import FancyInput from "./FancyInput";
import FancyText from "./FancyText";

export type FancyNumericInputProps = {
  label?: string;
  value?: number;
  onChange?: (value: number) => void;
};

export default function FancyNumericInput({ label }: FancyNumericInputProps) {
  return (
    <View style={styles.mainContainer}>
      <FancyText style={styles.text} title={label} />
      <View style={styles.fieldContainer}>
        <Button title="+"></Button>
        <FancyInput></FancyInput>
        <Button title="-"></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 10,
  },
  fieldContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: { fontSize: 13 },
});

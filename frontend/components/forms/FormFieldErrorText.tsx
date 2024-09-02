import { FieldError } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import FancyText from "../FancyText";

type FormFieldErrorTextProps = {
  error: FieldError;
};

export default function FormFieldErrorText({ error }: FormFieldErrorTextProps) {
  return (
    <View>
      {error !== undefined && error?.message !== undefined && error?.message?.trim() !== "" ? (
        <FancyText style={styles.errorLabel} title={error?.message} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  errorLabel: {
    fontSize: 10,
    color: "#c81f1f",
    marginLeft: 2,
  },
});

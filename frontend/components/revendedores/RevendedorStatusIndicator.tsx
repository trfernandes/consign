import { View, Text, StyleSheet } from "react-native";
import React from "react";
import FancyText from "../FancyText";

type Props = {
  status: "active" | "inactive";
};

export default function RevendedorStatusIndicator({ status }: Props) {
  return (
    <View
      style={[styles.container, status === "active" ? styles.active : styles.inactive]}
    >
      <FancyText
        style={status === "active" ? styles.textActive : styles.textInactive}
        title={status === "active" ? "Ativo" : "Inativo"}
        type="bodyLarge"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 30,
    width: 70,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#abb2b9",
    // backgroundColor: "#0080ff",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 3,
  },
  active: { backgroundColor: "#b8ffbe", borderColor: "#23752a", borderWidth: 1 },
  inactive: { backgroundColor: "#ff7979", borderColor: "#831f1f", borderWidth: 1 },
  textActive: { color: "#23752a", fontSize: 11 },
  textInactive: { color: "#831f1f", fontSize: 11 },
});

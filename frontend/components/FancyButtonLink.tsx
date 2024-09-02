import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { Link } from "expo-router";
import FancyText from "./FancyText";

export default function FancyButtonLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link href={href} asChild>
      <Pressable style={styles.buttonContainer}>
        <FancyText title={label} type="titleLarge" style={styles.buttonText} />
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    gap: 5,
    flexDirection: "row",
    padding: 10,
    borderRadius: 20,
    width: 150,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0080ff",
  },
  buttonText: {
    textAlignVertical: "center",
    textAlign: "center",
    verticalAlign: "middle",
    fontSize: 12,
    color: "white",
  },
});

import { View, Text, StyleSheet } from "react-native";
import React from "react";
import FancyText from "./FancyText";
import FancyButtonIcon from "./FancyButtonIcon";
import { router } from "expo-router";

type AppHeaderProps = { title: string; right: () => React.ReactNode };

export default function AppHeader({ title, right }: AppHeaderProps) {
  return (
    <View style={styles.mainContainer}>
      <FancyButtonIcon
        style={styles.icon}
        name={"chevron-back-outline"}
        size={18}
        onPress={() => router.back()}
      />
      <View style={styles.titleContainer}>
        <FancyText style={styles.title} title={title} type="titleLarge" />
      </View>
      {right()}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    alignItems: "stretch",
    backgroundColor: "transparent",
    paddingVertical: 15,
    paddingHorizontal: 15,
    gap: 15,
  },
  icon: {
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
    flex: 1,
    // backgroundColor: "red",
  },
  title: {
    // alignSelf: "center",
    fontWeight: "400",
    fontSize: 16,
  },
});

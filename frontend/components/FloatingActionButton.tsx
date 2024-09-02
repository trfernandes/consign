import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

type FloatingActionButtonProps = {
  onPress?: () => void;
};

export default function FloatingActionButton({ onPress }: FloatingActionButtonProps) {
  return (
    <TouchableHighlight
      onPress={onPress}
      style={styles.mainContainer}
      underlayColor={"#73b9ff"}
    >
      <Ionicons name="add-sharp" size={40} color={"white"} style={styles.icon} />
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 7,
    position: "absolute",
    right: 20,
    bottom: 12,
    backgroundColor: "#0080ff",
    borderRadius: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 3,
  },
  icon: {
    // borderColor: "#abb2b9",
  },
});

import {
  Text,
  StyleSheet,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
  Pressable,
  PressableProps,
} from "react-native";
import React from "react";
import FancyText from "./FancyText";

type FancyButtonProps = {
  title?: string;
  disabled?: boolean;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  style?: StyleProp<ViewStyle> | undefined;
};

export default function FancyButton({
  disabled = false,
  onPress,
  title,
  style,
  ...props
}: FancyButtonProps & PressableProps) {
  return (
    <Pressable
      style={[
        styles.buttonContainer,
        disabled
          ? styles.buttonContainerColorDisabled
          : styles.buttonContainerColorEnabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      {...props}
    >
      {title ? (
        <FancyText style={styles.buttonText} title={title} type="bodyLarge" />
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    gap: 10,
    flexDirection: "row",
    padding: 10,
    borderRadius: 20,
    width: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainerColorEnabled: { backgroundColor: "#0080ff" },
  buttonContainerColorDisabled: { backgroundColor: "grey" },
  buttonText: {
    textAlignVertical: "center",
    textAlign: "center",
    verticalAlign: "middle",
    fontSize: 11,
    fontFamily: "Montserrat_700Bold",
    color: "white",
  },
});

import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  TouchableHighlight,
  ViewStyle,
} from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

type FancyButtonIconProps = {
  name: any;
  color?: string;
  size?: number;
  onPress?: () => void;
  style?: ViewStyle;
};

export default function FancyButtonIcon({
  name,
  color = "black",
  size = 24,
  style,
  onPress,
}: FancyButtonIconProps) {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <Ionicons name={name} size={size} color={color} />
    </TouchableOpacity>
  );
}

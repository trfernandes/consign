import { View, Text, StyleSheet, TextProps, StyleProp, TextStyle } from "react-native";
import React from "react";

type TextType =
  | "titleSmall"
  | "titleMedium"
  | "titleLarge"
  | "subTitleSmall"
  | "subTitleMedium"
  | "subTitleLarge"
  | "bodySmall"
  | "bodyMedium"
  | "bodyLarge";

type FancyTextProps = {
  title?: string;
  type?: TextType;
};

const styles = StyleSheet.create({
  titleSmall: { fontFamily: "Montserrat_400Regular", fontSize: 12, color: "black" },
  titleMedium: { fontFamily: "Montserrat_500Medium", fontSize: 15, color: "black" },
  titleLarge: { fontFamily: "Montserrat_600SemiBold", fontSize: 17, color: "black" },
  subTitleSmall: { fontFamily: "Montserrat_400Regular", fontSize: 16, color: "black" },
  subTitleMedium: { fontFamily: "Montserrat_500Medium", fontSize: 16, color: "black" },
  subTitleLarge: { fontFamily: "Montserrat_600SemiBold", fontSize: 16, color: "black" },
  bodySmall: { fontFamily: "Montserrat_400Regular", fontSize: 12, color: "black" },
  bodyMedium: { fontFamily: "Montserrat_500Medium", fontSize: 16, color: "black" },
  bodyLarge: { fontFamily: "Montserrat_600SemiBold", fontSize: 20, color: "black" },
});

type StyleText = {
  [key: string]: StyleProp<TextStyle>;
};

const stylesText: StyleText = {
  titleSmall: styles.titleSmall,
  titleMedium: styles.titleMedium,
  titleLarge: styles.titleLarge,
  subTitleSmall: styles.subTitleSmall,
  subTitleMedium: styles.subTitleMedium,
  subTitleLarge: styles.subTitleLarge,
  bodySmall: styles.bodySmall,
  bodyMedium: styles.bodyMedium,
  bodyLarge: styles.bodyLarge,
};

export default function FancyText({
  type = "bodyMedium",
  title,
  style,
  ...props
}: FancyTextProps & TextProps) {
  return (
    <Text style={[stylesText[type], style]} {...props}>
      {title}
    </Text>
  );
}

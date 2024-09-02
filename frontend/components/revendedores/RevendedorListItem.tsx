import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { RevendedorEntitiy } from "../../app/revendedores/list";
import Avatar from "../Avatar";
import FancyText from "../FancyText";
import RevendedorStatusIndicator from "./RevendedorStatusIndicator";

export default function RevendedorListItem({
  data: { nome, ativo, endereco },
}: {
  data: RevendedorEntitiy;
}) {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.avatarContainer}>
        <Avatar
          url="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
          size={60}
        />
      </View>
      <View style={styles.textContainer}>
        <FancyText
          title={nome}
          type="titleSmall"
          adjustsFontSizeToFit={true}
          numberOfLines={1}
          style={styles.title}
        />

        <FancyText
          title={endereco}
          type="bodyMedium"
          numberOfLines={2}
          style={styles.subtitle}
        ></FancyText>
      </View>
      <View style={styles.statusContainer}>
        <RevendedorStatusIndicator status={ativo ? "active" : "inactive"} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "row",
    gap: 16,
    paddingHorizontal: 15,
    alignItems: "stretch",
  },
  avatarContainer: { flex: 0 },
  textContainer: {
    gap: 4,
    flexDirection: "column",
    backgroundColor: "transparent",
    justifyContent: "center",
    flex: 1,
  },
  statusContainer: {
    backgroundColor: "transparent",
    flex: 0,
    padding: 2,
    justifyContent: "center",
  },
  title: { fontWeight: "500", fontSize: 13 },
  subtitle: { color: "grey", fontSize: 11, fontWeight: "500" },
  status: {},
});

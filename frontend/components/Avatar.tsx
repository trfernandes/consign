import { Image, StyleSheet, Text, View } from "react-native";
import FancyText from "./FancyText";

type AvatarProps = {
  url?: string;
  label?: string;
  size: number;
};

export default function Avatar(props: AvatarProps) {
  const { url, label, size } = props;
  const width: number = size;
  const height: number = size;
  return (
    <View style={styles.mainContainer}>
      <View style={[{ height: height, width: width, borderRadius: size / 2 }, styles.circleContainer]}></View>
      {url ? (
        <Image
          style={[{ height: height, width: width, borderRadius: size / 2 }, styles.image]}
          source={{
            uri: url,
          }}
        />
      ) : (
        <FancyText style={styles.text} title={label}></FancyText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 12,
  },
  circleContainer: {
    borderColor: "#abb2b9",
    backgroundColor: "#0080ff",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 8,
  },
  text: {
    fontSize: 70,
    color: "white",
    position: "absolute",
  },
  image: {
    position: "absolute",
  },
});

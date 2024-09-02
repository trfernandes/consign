import { ChevronRight } from "lucide-react-native";
import {
  View,
  Button,
  StyleSheet,
  ButtonProps,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";
import FancyButton from "../FancyButton";

type FormStepsButtons = {
  nextOnPress?: (event: GestureResponderEvent) => void;
  previousOnPress?: (event: GestureResponderEvent) => void;
  previousDisabled?: boolean;
  nextDisabled?: boolean;
  previousButtonTitle?: string;
  nextButtonTitle?: string;
};

export default function FormStepsButtons({
  nextOnPress,
  previousOnPress,
  previousDisabled,
  nextDisabled,
  previousButtonTitle,
  nextButtonTitle,
}: FormStepsButtons) {
  return (
    <View style={styles.mainContainer}>
      <FancyButton
        onPress={previousOnPress}
        disabled={previousDisabled}
        title={previousButtonTitle ? previousButtonTitle : "Anterior"}
      />
      <FancyButton
        onPress={nextOnPress}
        disabled={nextDisabled}
        title={nextButtonTitle ? nextButtonTitle : "Próximo"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "#f3f9ff",
    borderColor: "#dadada",
    borderRadius: 15,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    paddingBottom: 16,
    paddingTop: 20,
  },
  buttonContainer: {
    gap: 5,
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
    fontSize: 12,
    color: "white",
  },
});

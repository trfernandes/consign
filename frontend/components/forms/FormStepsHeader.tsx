import { ChevronLeft } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";
import {
  AnimatedCircularProgress,
  CircularProgress,
} from "react-native-circular-progress";
import { FormStep } from "./FormSteps";
import FancyText from "../FancyText";
import { router } from "expo-router";

export default function FormStepsHeader({
  title,
  steps,
  stepsIndex,
  stepsLength,
}: {
  title: string;
  steps: FormStep[];
  stepsIndex: number;
  stepsLength: number;
}) {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.leftContainer}>
        <ChevronLeft color={"black"} size={22} onPress={() => router.back()} />
      </View>
      <View style={styles.titleContainer}>
        <FancyText style={styles.textTitle} title={title} />
        <FancyText style={styles.textSubTitle} title={steps[stepsIndex].subTitle} />
      </View>
      <View style={styles.progressContainer}>
        <FormStepsProgress stepsIndex={stepsIndex} stepsLength={stepsLength} />
      </View>
    </View>
  );
}

function FormStepsProgress({
  stepsIndex,
  stepsLength,
}: {
  stepsIndex: number;
  stepsLength: number;
}) {
  return (
    <View style={styles.progressContainer}>
      <FormStepsProgressCircle stepsLength={stepsLength} stepsIndex={stepsIndex} />
      <FancyText
        style={styles.textProgress}
        title={`${stepsIndex + 1}/${stepsLength}`}
        type="titleLarge"
      />
    </View>
  );
}

type FormStepsProgressCircleProps = {
  stepsLength: number;
  stepsIndex: number;
};

function FormStepsProgressCircle({
  stepsLength,
  stepsIndex,
}: FormStepsProgressCircleProps) {
  const fill: number = (100 / stepsLength) * (stepsIndex + 1);
  return (
    <CircularProgress
      size={36}
      rotation={240}
      width={5}
      fill={fill}
      tintColor="#0080ff"
      backgroundColor="#cfcfcf"
    />
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    backgroundColor: "#f3f9ff",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderColor: "#dadada",
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  leftContainer: {
    flex: 0,
    marginRight: 10,
    marginLeft: 10,
    justifyContent: "center",
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  progressContainer: {
    flex: 0,
    marginRight: 5,
  },
  textTitle: {
    opacity: 0.8,
    fontSize: 14,
    fontFamily: "Montserrat_600SemiBold",
  },
  textSubTitle: { fontSize: 11, opacity: 0.7, fontFamily: "Montserrat_600SemiBold" },
  textProgress: {
    position: "absolute",
    left: 11,
    top: 11,
    opacity: 0.7,
    fontSize: 11,
    fontFamily: "Montserrat_700Bold",
  },
});

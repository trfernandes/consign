import { Keyboard, StyleSheet, View } from "react-native";
import FormStepsHeader from "./FormStepsHeader";
import FormStepsButtons from "./FormStepsButtons";
import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export type FormStepsProps = {
  title: string;
  steps: FormStep[];
  onFinish?: () => void;
};

export type FormStep = {
  subTitle: string;
  component: JSX.Element;
  onNextPress?: () => void;
  canNext?: () => Promise<boolean>;
};

export default function FormSteps({ title, steps, onFinish: onSubmit }: FormStepsProps) {
  const [stepsIndex, setStepsIndex] = useState(0);
  const step = steps[stepsIndex];

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <FormStepsHeader
          title={title}
          steps={steps}
          stepsIndex={stepsIndex}
          stepsLength={steps.length}
        />
      </View>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={true}
        style={{ flex: 1 }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.bodyContainer} // Add this style to your container
        scrollEnabled={true}
        fadingEdgeLength={50}
        keyboardShouldPersistTaps="handled"
      >
        {step.component}
      </KeyboardAwareScrollView>
      <View style={styles.footerContainer}>
        <FormStepsButtons
          nextButtonTitle={stepsIndex + 1 === steps.length ? "Finalizar" : "Próximo"}
          previousDisabled={stepsIndex === 0}
          nextOnPress={async () => {
            if ((await step.canNext()) === false) {
              return;
            }

            if (stepsIndex < steps.length - 1) {
              setStepsIndex(stepsIndex + 1);
            }
            if (stepsIndex === steps.length - 1) {
              onSubmit?.();
            } else {
              step.onNextPress?.();
            }
          }}
          previousOnPress={() => setStepsIndex(stepsIndex - 1)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { backgroundColor: "white", flexDirection: "column", flex: 1 },
  headerContainer: { flex: 0 },
  bodyContainer: { padding: 20, paddingBottom: 40 },
  footerContainer: { flex: 0 },
});

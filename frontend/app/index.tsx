import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import FancyButtonLink from "../components/FancyButtonLink";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import {
  Montserrat_400Regular,
  Montserrat_400Regular_Italic,
  Montserrat_500Medium,
  Montserrat_500Medium_Italic,
  Montserrat_700Bold,
  Montserrat_700Bold_Italic,
  Montserrat_600SemiBold,
  Montserrat_600SemiBold_Italic,
} from "@expo-google-fonts/montserrat";
import FancyText from "../components/FancyText";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Montserrat_400Regular,
    Montserrat_400Regular_Italic,
    Montserrat_500Medium,
    Montserrat_500Medium_Italic,
    Montserrat_700Bold,
    Montserrat_700Bold_Italic,
    Montserrat_600SemiBold,
    Montserrat_600SemiBold_Italic,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  

  return (
    <View style={{ flex: 1, alignItems: "stretch", backgroundColor: "white" }}>
      <StatusBar style="auto" />
      <SafeAreaView style={{ flex: 1 }}>
        <FancyButtonLink href="/revendedores" label="Revendedores" />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({ text: { fontFamily: "Montserrat_400Regular" } });

import React from "react";
import { Stack } from "expo-router";
import AppHeader from "../../components/AppHeader";
import { Text, View } from "react-native";
import FancyButtonIcon from "../../components/FancyButtonIcon";

export default function RevendedoesLayout() {
  return (
    <Stack
      screenOptions={{
        header: ({ options }) => (
          <AppHeader
            title={options.title}
            right={() => options.headerRight({ canGoBack: true })}
          />
        ),
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Revendedores",
          headerBackVisible: true,
          headerBackButtonMenuEnabled: true,
          headerRight: () => (
            <View style={{ flexDirection: "row", gap: 10 }}>
              {/* <FancyButtonIcon name={"filter"} size={18} />
              <FancyButtonIcon name={"reorder-four"} size={18} /> */}
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="details"
        options={{ title: "Detalhes", presentation: "modal", headerShown: false }}
      />
    </Stack>
  );
}

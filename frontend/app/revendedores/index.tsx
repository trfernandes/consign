import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import FancyButtonLink from "../../components/FancyButtonLink";
import RevendedorList from "./list";
import { router, Stack } from "expo-router";
import FancyButtonIcon from "../../components/FancyButtonIcon";
import FloatingActionButton from "../../components/FloatingActionButton";
import axios from "axios";

export default function RevendedorIndex() {
  const url = "http://10.0.2.2:3000/";
  const [revendedores, setRevendedores] = React.useState([]);

  useEffect(() => {
    console.log("getting info");
    axios.get(`${url}revendedores/`).then((response) => {
      console.log(response.data);
    });
  }, []);

  return (
    <View style={styles.mainContainer}>
      <RevendedorList />
      <FloatingActionButton onPress={() => router.navigate("revendedores/details")} />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: 5,
    marginBottom: 10,
    alignItems: "stretch",
    backgroundColor: "white",
  },
  headerText: {
    marginLeft: 15,
    fontSize: 20,
  },
  button: { alignSelf: "center" },
});

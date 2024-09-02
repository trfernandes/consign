import { View, Text, StyleSheet, FlatList, TouchableWithoutFeedback } from "react-native";
import React from "react";
import RevendedorListItem from "../../components/revendedores/RevendedorListItem";
import FloatingActionButton from "../../components/FloatingActionButton";
import { router } from "expo-router";

export type RevendedorEntitiy = {
  nome: string;
  endereco: string;
  ativo: boolean;
};

export default function RevendedorList() {
  const data: RevendedorEntitiy[] = [
    {
      nome: "Thiago Rodrigo Fernandes",
      ativo: true,
      endereco: "Rua Alfredo Bedin, 128, Santa Lúcia, Caxias do Sul",
    },
    {
      nome: "Juliana Karen da Silva Fernandes",
      ativo: false,
      endereco: "Rua Alfredo Bedin, 128, Santa Lúcia, Caxias do Sul",
    },
  ];
  return (
    <View style={styles.mainContainer}>
      <FlatList
        style={styles.listContainer}
        data={data}
        renderItem={({ item }) => (
          <TouchableWithoutFeedback
            onPress={() =>
              router.push<RevendedorEntitiy>({
                pathname: "revendedores/details",
                // params: item,
              })
            }
          >
            <RevendedorListItem data={item} />
          </TouchableWithoutFeedback>
        )}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 1,
              backgroundColor: "grey",
              opacity: 0.2,
              marginVertical: 10,
            }}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "stretch",
    backgroundColor: "white",
  },
  listContainer: { flex: 1, backgroundColor: "transparent", marginTop: 10 },
});

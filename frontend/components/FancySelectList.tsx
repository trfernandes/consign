import { StyleSheet, Text, View } from "react-native";
import { SelectList, SelectListProps } from "react-native-dropdown-select-list";
import FancyText from "./FancyText";

export type FancySelectListProps = {
  label?: string;
  data: any[];
};

export default function FancySelectList({ label, ...props }: FancySelectListProps & SelectListProps) {
  return (
    <View style={styles.mainContainer}>
      <FancyText style={styles.label} title={label} />
      <SelectList
        {...props}
        placeholder="(Selecione)"
        searchPlaceholder="Pesquisar"
        boxStyles={styles.select}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {},
  label: { fontSize: 13, marginBottom: 5, marginLeft: 2, },
  select: {
    color: "#555555",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    // height: 42,
    paddingLeft: 14,
  },
});

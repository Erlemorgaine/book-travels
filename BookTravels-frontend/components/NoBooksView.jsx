import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import AppTitle from "./AppTitle";
import ButtonPrimary from "./ButtonPrimary";
import { STYLES } from "../utilities/styles/fonts";
import ErrorText from "./ErrorText";

const NoBooksView = ({ onAdd, onExternalImport, errorMessage }) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "flex-end",
          gap: 20,
        }}
      >
        <Image
          style={styles.container.bookworm}
          source={require("../assets/bookworm_traveling.webp")}
          alt="A happy traveling bookworm with a little backpack on its back"
        />

        <AppTitle title="Welcome!" />
      </View>

      <Text style={{ paddingTop: 12, paddingBottom: 4 }}>
        And thank you for joining this app! Start diversifying your reading list
        by adding your first book!
      </Text>

      <ButtonPrimary label="Add my first book" onPress={onAdd} />

      <Text style={{ paddingTop: 12, paddingBottom: 8 }}>
        You can also import a json or csv file with the books you already read.
      </Text>
      <Text style={{ paddingBottom: 4 }}>
        <Text style={STYLES.Bold}>IMPORTANT:</Text> In order for the import to
        work, the file needs to have the columns (for csv) or keys (for json){" "}
        <Text style={STYLES.Bold}>writer</Text>,{" "}
        <Text style={STYLES.Bold}>title</Text> and{" "}
        <Text style={STYLES.Bold}>code</Text>, which should be a{" "}
        <Text style={STYLES.Bold}>2-letter ISO country code</Text>.
      </Text>
      <ButtonPrimary
        label="Import a csv or json file"
        onPress={onExternalImport}
      />

      <ErrorText text={errorMessage} />
    </View>
  );
};

export default NoBooksView;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 16,
    bookworm: {
      width: 187 * 0.5,
      height: 128 * 0.5,
      margin: "auto",
      marginTop: 0,
      marginBottom: 12,
      paddingRight: 40,
    },
  },
});

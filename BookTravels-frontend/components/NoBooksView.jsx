import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import AppTitle from "./AppTitle";
import ButtonPrimary from "./ButtonPrimary";

const NoBooksView = ({ onAdd }) => {
  return (
    <View style={styles.container}>
      <AppTitle title="Welcome!" />

      <View style={styles.container.intro}>
        <Text style={{ paddingBottom: 16 }}>
          And thank you for joining this app! I'm excited to meet a fellow book
          traveler, and I hope you are excited to start diversifying your
          reading list and learning more about the world in books.
        </Text>
        <Text>
          Tap on the button below, or on the round button below the map, to add
          your first book.
        </Text>
      </View>

      <Image
        style={styles.container.bookworm}
        source={require("../assets/bookworm_traveling.svg")}
      />
      <ButtonPrimary label="Add my first book" onPress={onAdd} />
    </View>
  );
};

export default NoBooksView;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    intro: {
      paddingBottom: 24,
    },
    bookworm: {
      width: 187 * 0.5,
      height: 128 * 0.5,
      margin: "auto",
      marginTop: 0,
      marginBottom: 24,
    },
  },
});

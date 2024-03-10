import React from "react";
import { Image, Text, StyleSheet } from "react-native";
import ButtonPrimary from "../components/ButtonPrimary";
import AppTitle from "../components/AppTitle";
import AccessWrapper from "../components/AccessWrapper";

export default Disclaimer = () => {
  return (
    <AccessWrapper>
      <Image
        style={styles.bookworm}
        source={require("../assets/bookworm_reading.webp")}
        alt="A happy bookworm reading a book"
      />
      <AppTitle title="Before we can start ... " />
      <Text>This is a custom component.</Text>
      <ButtonPrimary
        label="Gotcha! Now let me add my books"
        href={{ pathname: "home" }}
      />
    </AccessWrapper>
  );
};

const styles = StyleSheet.create({
  bookworm: {
    // width: 188 * 0.8,
    height: 168 * 0.8,
    aspectRatio: 1.1187,
    margin: "auto",
    marginTop: 0,
    marginBottom: 20,
  },
});

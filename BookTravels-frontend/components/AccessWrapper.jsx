import React, { useState } from "react";
import { View, ImageBackground, StyleSheet, Image } from "react-native";
import ButtonPrimary from "../components/ButtonPrimary";
// import Login from "./login";
// import SignUp from "./signup";
import { COLORS } from "../utilities/styles/colors";

const AccessWrapper = ({ children }) => {
  return (
    <View style={styles.accessWrapper}>
      <ImageBackground
        source={require("../assets/paper-texture-4.webp")}
        style={styles.background}
      >
        <View style={styles.accessWrapper.access}>{children}</View>
      </ImageBackground>
    </View>
  );
};

export default AccessWrapper;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },

  accessWrapper: {
    padding: 10,
    paddingTop: 40,
    flexGrow: 1,
    backgroundColor: COLORS.cardColor,

    access: {
      backgroundColor: COLORS.bgColor50,
      width: "100%",
      flex: 1,
      padding: 20,
      justifyContent: "center",
      alignItems: "center",
      paddingBottom: 60,
      borderRadius: 5,
      borderWidth: 2,
      borderColor: COLORS.primary,
    },
  },
});

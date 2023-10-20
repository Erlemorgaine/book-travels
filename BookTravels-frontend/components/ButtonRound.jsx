import React, { useState } from "react";
import { StyleSheet, Pressable, Text } from "react-native";
import { COLORS } from "../utilities/colors";

const ButtonRound = ({ onPress, icon, style = {} }) => {
  return (
    <Pressable style={{ ...styles.button, ...style }} onPress={onPress}>
      <Text style={styles.button.label}>{icon}</Text>
    </Pressable>
  );
};

export default ButtonRound;

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 50,
    width: 48,
    height: 48,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // shadowColor: `var(--card-shadow-dark)`,
    // shadowOffset: { width: -2, height: 4 },
    // shadowRadius: 5,
    label: {
      fontSize: 26,
      color: COLORS.white,
      lineHeight: 26,
      fontWeight: 700,
    },
  },
});

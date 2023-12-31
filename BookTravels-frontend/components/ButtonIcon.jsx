import React, { useState } from "react";
import { StyleSheet, Pressable, Text } from "react-native";
import { COLORS } from "../utilities/styles/colors";

const ButtonIcon = ({ onPress, icon, style = {} }) => {
  return (
    <Pressable style={{ ...styles.button, ...style }} onPress={onPress}>
      <Text style={styles.button.label}>{icon}</Text>
    </Pressable>
  );
};

export default ButtonIcon;

const styles = StyleSheet.create({
  button: {
    borderRadius: 50,
    width: 48,
    height: 48,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    label: {
      color: COLORS.primary,
      fontSize: 26,
      lineHeight: 26,
      fontWeight: 700,
    },
  },
});

import React, { useState } from "react";
import { StyleSheet, Pressable } from "react-native";

const ButtonIcon = ({ onPress, icon, style = {} }) => {
  return (
    <Pressable style={{ ...styles.button, ...style }} onPress={onPress}>
      {icon}
    </Pressable>
  );
};

export default ButtonIcon;

const styles = StyleSheet.create({
  button: {
    color: "var(--primary)",
    borderRadius: 50,
    width: 48,
    height: 48,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 26,
    lineHeight: 26,
    fontWeight: 700,
  },
});

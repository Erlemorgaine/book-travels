import React, { useState } from "react";
import { StyleSheet, Pressable } from "react-native";

const RoundButton = ({ onPress, icon, style = {} }) => {
  return (
    <Pressable style={{ ...styles.button, ...style }} onPress={onPress}>
      {icon}
    </Pressable>
  );
};

export default RoundButton;

const styles = StyleSheet.create({
  button: {
    color: "var(--white)",
    backgroundColor: "var(--primary)",
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

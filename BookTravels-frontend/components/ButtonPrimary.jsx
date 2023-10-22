import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { COLORS } from "../utilities/styles/colors";

const ButtonPrimary = ({ label, onPress, style = {}, disabled = false }) => {
  return (
    <Pressable
      style={[styles.button, style, disabled ? styles.disabled : {}]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.button.label}>{label}</Text>
    </Pressable>
  );
};

export default ButtonPrimary;

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    padding: 12,
    paddingBottom: 10,
    // margin: 10,
    marginTop: 15,
    borderRadius: 5,
    width: "100%",
    label: {
      fontFamily: "SpecialElite-Regular",
      color: COLORS.white,
      textTransform: "uppercase",
      textAlign: "center",
    },
  },
  disabled: {
    opacity: 0.5,
  },
});

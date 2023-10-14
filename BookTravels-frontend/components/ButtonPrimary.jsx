import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

const ButtonPrimary = ({ label, onPress, disabled = false }) => {
  return (
    <Pressable
      style={{ ...styles.button, ...(disabled ? styles.disabled : {}) }}
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
    backgroundColor: "var(--primary)",
    padding: 12,
    paddingBottom: 10,
    // margin: 10,
    marginTop: 15,
    borderRadius: 5,
    width: "100%",
    label: {
      fontFamily: "Headings",
      fontWeight: 700,
      color: "var(--white)",
      textTransform: "uppercase",
      textAlign: "center",
    },
  },
  disabled: {
    opacity: 0.5,
  },
});

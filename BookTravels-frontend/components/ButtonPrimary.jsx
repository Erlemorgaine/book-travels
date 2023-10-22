import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { Link } from "expo-router";
import { COLORS } from "../utilities/styles/colors";
import { FONTS } from "../utilities/styles/fonts";

const ButtonPrimary = ({
  label,
  onPress,
  href,
  style = {},
  disabled = false,
}) => {
  return href ? (
    <Link
      href={href}
      style={[styles.button, style, disabled ? styles.disabled : {}]}
      disabled={disabled}
    >
      <Text style={styles.label}>{label}</Text>
    </Link>
  ) : (
    <Pressable
      style={[styles.button, style, disabled ? styles.disabled : {}]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
};

export default ButtonPrimary;

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    padding: 15,
    paddingBottom: 13,
    // margin: 10,
    marginTop: 15,
    borderRadius: 5,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontFamily: FONTS.SpecialElite,
    color: COLORS.white,
    textTransform: "uppercase",
    textAlign: "center",
    width: "100%",
  },
  disabled: {
    opacity: 0.5,
  },
});

import React from "react";
import { StyleSheet, Text } from "react-native";
import { COLORS } from "../utilities/styles/colors";

const ErrorText = ({ text }) => {
  return <Text style={styles.errorText}>{text}</Text>;
};

export default ErrorText;

const styles = StyleSheet.create({
  errorText: {
    color: COLORS.primaryRedDark,
    marginTop: 12,
  },
});

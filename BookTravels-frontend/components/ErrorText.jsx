import React from "react";
import { StyleSheet, Text } from "react-native";

const ErrorText = ({ text }) => {
  return <Text style={styles.errorText}>{text}</Text>;
};

export default ErrorText;

const styles = StyleSheet.create({
  errorText: {
    color: "var(--primary-red-dark)",
    marginTop: 12,
  },
});

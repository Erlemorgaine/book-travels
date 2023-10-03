import React, { useState } from "react";
import { TextInput, StyleSheet } from "react-native";

const InputField = ({ placeholder, value, onChange }) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChange}
    />
  );
};

export default InputField;

const styles = StyleSheet.create({
  input: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: "var(--white)",
    margin: 10,
    marginTop: 5,
    marginBottom: 0,
    borderWidth: 2,
    borderColor: `var(--card-shadow)`,
  },
});

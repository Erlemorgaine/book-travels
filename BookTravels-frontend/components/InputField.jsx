import React, { useState } from "react";
import { TextInput, StyleSheet } from "react-native";

const InputField = ({ value, onChange, placeholder = "", style = {} }) => {
  return (
    <TextInput
      style={{ ...style, ...styles.input }}
      placeholder={placeholder}
      value={value}
      onChangeText={onChange}
    />
  );
};

export default InputField;

const styles = StyleSheet.create({
  input: {
    width: "100%",
    padding: 12,
    borderRadius: 10,
    backgroundColor: "var(--white)",
    // margin: 10,
    marginTop: 5,
    marginBottom: 0,
    borderWidth: 2,
    borderColor: `var(--card-shadow)`,
  },
});

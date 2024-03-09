import React, { useState } from "react";
import { TextInput, StyleSheet, View, Text } from "react-native";
import { COLORS } from "../utilities/styles/colors";

const SearchField = ({
  value,
  onChange,
  label = "",
  placeholder = "",
  optional = false,
  style = {},
}) => {
  return (
    <View style={[styles.container, style]} accessible>
      <Text style={{ paddingLeft: 4, marginTop: 4 }}>
        {label && <Text style={styles.label}>{label}</Text>}
        {optional && <Text style={styles.optional}> (optional)</Text>}
      </Text>

      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
      />
    </View>
  );
};

export default SearchField;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  label: {
    fontWeight: "bold",
    fontSize: 12,
  },
  optional: {
    fontSize: 12,
    color: COLORS.greyDark,
    paddingLeft: 4,
  },
  input: {
    width: "100%",
    padding: 10,
    marginTop: 2,
    marginBottom: 0,
    borderWidth: 2,
    borderBottomColor: COLORS.cardShadow,
  },
});

import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";

const AppTitle = ({ title, style = {} }) => {
  return <Text style={{ ...styles.title, ...style }}>{title}</Text>;
};

export default AppTitle;

const styles = StyleSheet.create({
  title: {
    color: "var(--black)",
    textAlign: "center",
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "700",
    fontFamily: "Headings",
    paddingBottom: 5,
  },
});

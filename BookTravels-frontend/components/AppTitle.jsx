import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";
import { COLORS } from "../utilities/styles/colors";
import { FONTS } from "../utilities/styles/fonts";

const AppTitle = ({ title, style = {} }) => {
  return <Text style={{ ...styles.title, ...style }}>{title}</Text>;
};

export default AppTitle;

const styles = StyleSheet.create({
  title: {
    color: COLORS.primary,
    textAlign: "center",
    fontSize: 24,
    lineHeight: 26,
    fontFamily: FONTS.SpecialElite,
    paddingBottom: 12,
  },
});

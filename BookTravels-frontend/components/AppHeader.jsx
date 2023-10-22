import React from "react";
import { StyleSheet, Text } from "react-native";
import { Header } from "react-native/Libraries/NewAppScreen";
import { COLORS } from "../utilities/styles/colors";

const AppHeader = ({ text }) => {
  return <Header style={styles.header}>{text}</Header>;
};

export default AppHeader;

const styles = StyleSheet.create({
  header: {
    color: COLORS.primaryRedDark,
    marginTop: 12,
  },
});

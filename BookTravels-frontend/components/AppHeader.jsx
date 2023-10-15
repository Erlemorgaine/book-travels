import React from "react";
import { StyleSheet, Text } from "react-native";
import { Header } from "react-native/Libraries/NewAppScreen";

const AppHeader = ({ text }) => {
  return <Header style={styles.header}>{text}</Header>;
};

export default AppHeader;

const styles = StyleSheet.create({
  header: {
    color: "var(--primary-red-dark)",
    marginTop: 12,
  },
});

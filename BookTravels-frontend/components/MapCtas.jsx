import React from "react";
import { View, StyleSheet, Text } from "react-native";

const MapCtas = ({ label }) => {
  return (
    <View style={styles.container}>
      <Text>{label}</Text>
    </View>
  );
};

export default MapCtas;

const styles = StyleSheet.create({
  container: {},
});

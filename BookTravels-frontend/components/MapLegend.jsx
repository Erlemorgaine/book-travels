import React from "react";
import { View, StyleSheet, Text } from "react-native";

const MapLegend = ({ label }) => {
  return (
    <View style={styles.container}>
      <Text>{label}</Text>
    </View>
  );
};

export default MapLegend;

const styles = StyleSheet.create({
  container: {},
});

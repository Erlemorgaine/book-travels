import React from "react";
import { View, StyleSheet, Text } from "react-native";

const MapLegend = ({ style }) => {
  return (
    <View style={{ ...style, ...styles.legend }}>
      <View style={styles.legend.item}>
        <View style={styles.legend.item.read} />
        <Text style={styles.legend.text}>Read</Text>
      </View>
      <View style={styles.legend.item}>
        <View style={styles.legend.item.unread} />
        <Text style={styles.legend.text}>Unread</Text>
      </View>
    </View>
  );
};

export default MapLegend;

const styles = StyleSheet.create({
  legend: {
    gap: 4,
    padding: 4,
    backgroundColor: "var(--card-color-80)",
    borderRadius: 5,
    text: {
      fontSize: 12,
    },
    item: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      read: {
        width: 20,
        height: 20,
        borderRadius: 6,
        backgroundColor: "var(--primary-green)",
      },
      unread: {
        width: 20,
        height: 20,
        borderRadius: 6,
        backgroundColor: "var(--primary-red)",
      },
    },
  },
});

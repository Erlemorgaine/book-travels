import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { COLORS } from "../utilities/colors";

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
    backgroundColor: COLORS.cardColor80,
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
        backgroundColor: COLORS.primaryGreen,
      },
      unread: {
        width: 20,
        height: 20,
        borderRadius: 6,
        backgroundColor: COLORS.primaryRed,
      },
    },
  },
});

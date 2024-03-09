import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { COLORS } from "../utilities/styles/colors";

const MapLegend = ({ style }) => {
  return (
    <View style={{ ...style, ...styles.legend }}>
      <View style={styles.legend.item}>
        <View style={styles.legend.item.read} />
        <Text style={styles.legend.text}>Read</Text>
      </View>
      <View style={styles.legend.item}>
        <View style={styles.legend.item.unread} />
        <Text style={styles.legend.text}>Want to read</Text>
      </View>
    </View>
  );
};

export default MapLegend;

const styles = StyleSheet.create({
  legend: {
    gap: 4,
    padding: 4,
    paddingRight: 8,
    backgroundColor: COLORS.cardColor,
    borderRadius: 5,
    shadowColor: COLORS.cardShadowDark,
    shadowOffset: { width: -2, height: -14 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 5, // Necessary to show shadow for Android!
    text: {
      fontSize: 12,
    },
    item: {
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

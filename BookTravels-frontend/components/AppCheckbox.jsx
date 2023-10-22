import React, { useState } from "react";
import { Switch, Text, StyleSheet, View } from "react-native";
import { COLORS } from "../utilities/styles/colors";

const AppCheckbox = ({ setEnabled, isEnabled, label }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <Switch
        trackColor={{
          false: COLORS.primaryRedlight,
          true: COLORS.primaryGreenlight,
        }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={setEnabled}
        value={isEnabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 10,
  },
  label: {
    paddingLeft: 10,
  },
});

export default AppCheckbox;

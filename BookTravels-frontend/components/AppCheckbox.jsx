import React, { useState } from "react";
import { Switch, Text, StyleSheet, View } from "react-native";
import { COLORS } from "../utilities/colors";

const AppCheckbox = ({ setEnabled, isEnabled, label }) => {
  return (
    <View style={styles.container}>
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

      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "center",
    paddingTop: 20,
    paddingBottom: 10,
  },
  label: {
    paddingLeft: 10,
  },
});

export default AppCheckbox;

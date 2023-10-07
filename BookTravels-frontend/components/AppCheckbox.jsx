import React, { useState } from "react";
import { Switch, Text, StyleSheet, View } from "react-native";

const AppCheckbox = ({ setEnabled, isEnabled }) => {
  return (
    <View style={styles.container}>
      <Switch
        trackColor={{
          false: "var(--primary-red-light)",
          true: "var(--primary-green-light)",
        }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={setEnabled}
        value={isEnabled}
      />

      <Text style={styles.label}>I've read this book already</Text>
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

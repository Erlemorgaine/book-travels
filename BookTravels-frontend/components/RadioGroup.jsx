import React from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { COLORS } from "../utilities/styles/colors";
import { RadioButton } from "react-native-paper";

const RadioGroup = ({ label, options, selectedOption, onOptionSelect }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.optionsContainer}>
        {options.map((option) => (
          <View key={option} style={styles.option}>
            <RadioButton
              value={option}
              status={option === selectedOption ? "checked" : "unchecked"}
              onPress={() => onOptionSelect(option)}
              color={COLORS.primaryGreenDark}
            />

            <Pressable onPress={() => onOptionSelect(option)}>
              {/* I know this is very ugly and not scalable code, but ok for this app */}
              <Text>{option === "code" ? "country" : option}</Text>
            </Pressable>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    marginBottom: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 2,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
  },
  selectedOption: {
    backgroundColor: COLORS.primaryGreen,
  },
  optionText: {
    color: COLORS.textDark,
  },
});

export default RadioGroup;

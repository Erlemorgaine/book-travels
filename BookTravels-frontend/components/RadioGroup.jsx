import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { COLORS } from "../utilities/styles/colors";

const RadioGroup = ({ label, options, selectedOption, onOptionSelect }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.optionsContainer}>
        {options.map((option) => (
          <View
            key={option}
            style={[
              styles.option,
              option === selectedOption && styles.selectedOption,
            ]}
            onTouchEnd={() => onOptionSelect(option)}
          >
            <Text style={styles.optionText}>{option}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  option: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.primaryGreen,
  },
  selectedOption: {
    backgroundColor: COLORS.primaryGreen,
  },
  optionText: {
    color: COLORS.textDark,
  },
});

export default RadioGroup;

import React, { useState } from "react";
import { TextInput, StyleSheet } from "react-native";
import { COLORS } from "../utilities/styles/colors";

const InputField = ({ value, onChange, placeholder = "", style = {} }) => {
  return (
    <TextInput
      style={{ ...style, ...styles.input }}
      placeholder={placeholder}
      value={value}
      onChangeText={onChange}
    />
  );
};

export default InputField;

const styles = StyleSheet.create({
  input: {
    width: "100%",
    padding: 12,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    // margin: 10,
    marginTop: 5,
    marginBottom: 0,
    borderWidth: 2,
    borderColor: COLORS.cardShadow,
  },
});

// import React, { useState } from 'react';
// import { TextInput, View, Text, Platform, StyleSheet } from 'react-native';

// const isAndroid = Platform.os === 'android';
// const editableTextInputColor = '#494949';
// const disabledTextInputColor = '#BBB';
// const focusedInputColor = '#0D12B9'
// const minimumTouchableSize = 48;

// const AccessibleTextInput = ({ label = 'Email', inputValue = '', placeholderText = 'example@domain.com', accessibilityLabel = 'Enter email' }) => {
//   const value, setValue = useState(inputValue)
//   const editable, setEditable = useState(true)
//   const isFocused, setFocus = useState(false)
//   const textInputColor = editable ? editableTextInputColor : disabledTextInputColor;
//   const styles = StyleSheet.create
//     ({ label: { color: isFocused ? focusedInputColor : textInputColor }, input: { backgroundColor: '#FFF', padding: 8, height: minimumTouchableSize, width: "100%", borderColor: isFocused ? focusedInputColor : textInputColor, borderWidth: isFocused ? 2 : 1, borderRadius: 4, marginTop: 8 } });
//   const accessibilityState = { disabled: !editable }

//   return (<View
//     accessible
//     accessibilityLabel={isAndroid ? accessibilityLabel : `${accessibilityLabel}${!editable ? ': Disabled!' : ''}`}
//     accessibilityState={accessibilityState}>
//     <Text style={styles.label}>{label}</Text>
//     <TextInput
//       placeholder={placeholderText}
//       placeholderTextColor={textInputColor}
//       value={value}
//       onChangeText={(text) => setValue(text)}
//       editable={editable}
//       onFocus={() => setFocus(true)}
//       onBlur={() => setFocus(false)} />
//   </View>)
// };
// export default AccessibleTextInput;

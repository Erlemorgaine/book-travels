import React, { useState } from "react";
import { View, Alert, StyleSheet } from "react-native";
import { createUser } from "../utilities/api";
import ButtonPrimary from "./ButtonPrimary";
import InputField from "./InputField";
import ErrorText from "./ErrorText";

const SignUp = ({ onUserCreated }) => {
  const [userId, setUserId] = useState("");
  const [showError, setShowError] = useState(false);

  const handleInputChange = (text) => setUserId(text);

  const handleApiPost = () => {
    createUser(userId)
      .then((countries) => {
        if (!countries) {
          setShowError(true);
        } else {
          onUserCreated(userId, countries);
        }
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
        Alert.alert("Error", "API POST request failed.");
      });
  };

  return (
    <View style={styles.signUpWrapper}>
      <InputField
        placeholder="Choose a unique username"
        value={userId}
        onChange={(text) => handleInputChange(text)}
      />

      <ButtonPrimary label="Start reading" onPress={handleApiPost} />

      {showError && (
        <ErrorText text="Unfortunately this username already exists. Enter your next favourite username!" />
      )}
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  signUpWrapper: {
    width: "100%",
  },
});

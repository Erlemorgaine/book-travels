import React, { useState } from "react";
import { View, Alert, StyleSheet } from "react-native";
import { createUser } from "../utilities/api";
import ButtonPrimary from "./ButtonPrimary";
import InputField from "./InputField";

const SignUp = ({ onUserCreated }) => {
  const [userId, setUserId] = useState("");

  const handleInputChange = (text) => setUserId(text);

  const handleApiPost = () => {
    createUser(userId)
      .then((countries) => onUserCreated(userId, countries))
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
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  signUpWrapper: {
    width: "100%",
  },
});

import React, { useState } from "react";
import { View, Alert, StyleSheet } from "react-native";
import { createUser } from "../utilities/api";
import ButtonPrimary from "./ButtonPrimary";
import InputField from "./InputField";

const Login = ({ onUserCreated }) => {
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
    <View style={styles.loginWrapper}>
      <InputField
        placeholder="Choose a unique username"
        value={userId}
        onChange={(text) => handleInputChange(text)}
      />

      <ButtonPrimary label="Start reading" onPress={handleApiPost} />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  loginWrapper: {
    padding: 20,
    flexGrow: 1,
    backgroundColor: "var(--bg-color-50)",
    justifyContent: "center",
    alignItems: "center",
  },
});

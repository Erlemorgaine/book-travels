import React, { useState } from "react";
import { View, Alert, StyleSheet } from "react-native";
import { createUser } from "../utilities/api";
import ButtonPrimary from "./ButtonPrimary";
import InputField from "./InputField";

const Login = ({ onLogin }) => {
  const [userId, setUserId] = useState("");

  const handleInputChange = (text) => setUserId(text);

  const handleApiPost = () => {
    createUser(userId)
      .then((countries) => onLogin(userId, countries))
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
        Alert.alert("Error", "API POST request failed.");
      });
  };

  return (
    <View style={styles.loginWrapper}>
      <InputField
        placeholder="Enter your username"
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
    flexGrow: 1,
    backgroundColor: "var(--bg-color-50)",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});

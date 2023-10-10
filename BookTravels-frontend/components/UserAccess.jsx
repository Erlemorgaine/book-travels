import React, { useState } from "react";
import { View, Alert, ImageBackground, StyleSheet } from "react-native";
import { createUser } from "../utilities/api";
import ButtonPrimary from "./ButtonPrimary";
import InputField from "./InputField";

const UserAccess = ({ onUserCreated }) => {
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
    <ImageBackground
      source={require("../assets/paper-texture-4.jpeg")}
      style={styles.background}
    >
      <View style={styles.loginWrapper}>
        <InputField
          placeholder="Choose a unique username"
          value={userId}
          onChange={(text) => handleInputChange(text)}
        />

        <ButtonPrimary label="Start reading" onPress={handleApiPost} />
      </View>
    </ImageBackground>
  );
};

export default UserAccess;

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

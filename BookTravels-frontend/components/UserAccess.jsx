import React, { useState } from "react";
import { View, TextInput, Button, Alert, Pressable } from "react-native";
import { createUser } from "../utilities/api";

const UserAccess = ({ onUserCreated }) => {
  const [userId, setUserId] = useState("");

  const handleInputChange = (text) => setUserId(text);

  const handleApiPost = () => {
    createUser(userId)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(() => onUserCreated(userId))
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
        Alert.alert("Error", "API POST request failed.");
      });
  };

  return (
    <View>
      <TextInput
        placeholder="Choose a unique username"
        value={userId}
        onChangeText={(text) => handleInputChange(text)}
      />

      <Pressable onPress={handleApiPost}>Start reading</Pressable>
    </View>
  );
};

export default UserAccess;

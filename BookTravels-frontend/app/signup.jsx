import React, { useContext, useState } from "react";
import { View, Alert, StyleSheet } from "react-native";
import ButtonPrimary from "../components/ButtonPrimary";
import InputField from "../components/InputField";
import ErrorText from "../components/ErrorText";
import AccessWrapper from "../components/AccessWrapper";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { storageUserId } from "../contexts/authentication";
import { DataContext } from "../contexts/data";

export default SignUp = () => {
  const [userId, setUserId] = useState("");
  const [showError, setShowError] = useState(false);
  const { setData } = useContext(DataContext);

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

  async function onUserCreated(id, countries) {
    await AsyncStorage.setItem(storageUserId, id);
    // setUserId(id);
    // setCountryBooks(countries);
    setData(countries);

    router.push({
      pathname: "home",
      params: { userId: id },
    });
  }

  return (
    <AccessWrapper>
      <InputField
        placeholder="Choose a unique username"
        value={userId}
        onChange={(text) => handleInputChange(text)}
      />

      <ButtonPrimary label="Start reading" onPress={handleApiPost} />

      {showError && (
        <ErrorText text="Unfortunately this username already exists. Enter your next favourite username!" />
      )}
    </AccessWrapper>
  );
};

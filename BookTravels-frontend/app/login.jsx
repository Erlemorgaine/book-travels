import React, { useContext, useState } from "react";
import { View, Alert, StyleSheet, Text } from "react-native";
import ButtonPrimary from "../components/ButtonPrimary";
import InputField from "../components/InputField";
import ErrorText from "../components/ErrorText";
import { COLORS } from "../utilities/styles/colors";
import AccessWrapper from "../components/AccessWrapper";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { storageUserId } from "../contexts/authentication";
import { DataContext } from "../contexts/data";

export default Login = () => {
  const [userId, setUserId] = useState("");
  const [showError, setShowError] = useState(false);
  const { setData } = useContext(DataContext);

  const handleInputChange = (text) => setUserId(text);

  const handleApiPost = () => {
    // loginUser(userId).then((countries) => {
    //   if (!countries) {
    //     setShowError(true);
    //   } else {
    // onLogin(userId, countries);
    onLogin();
    //   }
    // });
  };

  // async function onLogin(id, countries) {
  async function onLogin() {
    // await AsyncStorage.setItem(storageUserId, id);
    // setUserId(id);
    // setCountryBooks(countries);

    // setData(countries);

    router.push({
      pathname: "home",
    });
  }

  return (
    <AccessWrapper>
      <InputField
        placeholder="Enter your username"
        value={userId}
        onChange={(text) => handleInputChange(text)}
      />

      <ButtonPrimary label="Start reading" onPress={handleApiPost} />
      {showError && (
        <ErrorText text="This username doesn't seem to exist yet. Did you type in the correct username?" />
      )}
    </AccessWrapper>
  );
};

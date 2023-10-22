import React, { useState } from "react";
import { View, Alert, StyleSheet, Text } from "react-native";
import { loginUser } from "../utilities/api";
import ButtonPrimary from "./ButtonPrimary";
import InputField from "./InputField";
import ErrorText from "./ErrorText";
import { COLORS } from "../utilities/styles/colors";

const Login = ({ onLogin }) => {
  const [userId, setUserId] = useState("");
  const [showError, setShowError] = useState(false);

  const handleInputChange = (text) => setUserId(text);

  const handleApiPost = () => {
    loginUser(userId).then((countries) => {
      if (!countries) {
        setShowError(true);
      } else {
        onLogin(userId, countries);
      }
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
      {showError && (
        <ErrorText text="This username doesn't seem to exist yet. Did you type in the correct username?" />
      )}
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
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});

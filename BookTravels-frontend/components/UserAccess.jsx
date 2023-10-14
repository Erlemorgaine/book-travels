import React, { useState } from "react";
import { View, ImageBackground, StyleSheet, Image } from "react-native";
import ButtonPrimary from "./ButtonPrimary";
import Login from "./LogIn";
import SignUp from "./SignUp";

const UserAccess = ({ onUserCreated, onLogin }) => {
  const [login, setLogin] = useState(false);
  const [signUp, setSignUp] = useState(false);

  return (
    <ImageBackground
      source={require("../assets/paper-texture-4.jpeg")}
      style={styles.background}
    >
      <View style={styles.accessWrapper}>
        {!login && !signUp && (
          <View style={styles.accessWrapper.access}>
            <Image
              style={styles.bookworm}
              source={require("../assets/bookworm_reading.svg")}
            />
            <ButtonPrimary label="Sign up" onPress={() => setSignUp(true)} />
            <ButtonPrimary label="Login" onPress={() => setLogin(true)} />
          </View>
        )}

        {signUp && <SignUp onUserCreated={onUserCreated} />}
        {login && <Login onLogin={onLogin} />}
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
  bookworm: {
    width: 187 * 0.8,
    height: 168 * 0.8,
    margin: "auto",
    marginTop: 0,
    marginBottom: 20,
  },
  accessWrapper: {
    padding: 20,
    flexGrow: 1,
    backgroundColor: "var(--bg-color-50)",
    justifyContent: "center",
    alignItems: "center",
    access: {
      width: "100%",
      paddingBottom: 60,
    },
  },
});

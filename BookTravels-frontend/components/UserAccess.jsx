import React, { useState } from "react";
import { View, ImageBackground, StyleSheet, Image } from "react-native";
import ButtonPrimary from "./ButtonPrimary";
import Login from "./LogIn";
import SignUp from "./SignUp";
import { COLORS } from "../utilities/styles/colors";

const UserAccess = ({ onUserCreated, onLogin }) => {
  const [login, setLogin] = useState(false);
  const [signUp, setSignUp] = useState(false);

  return (
    <View style={styles.accessWrapper}>
      <ImageBackground
        source={require("../assets/paper-texture-4.webp")}
        style={styles.background}
      >
        <View style={styles.accessWrapper.access}>
          {!login && !signUp && (
            <>
              <Image
                style={styles.bookworm}
                source={require("../assets/bookworm_reading.webp")}
                alt="A happy bookworm reading a book"
              />
              <ButtonPrimary label="Sign up" onPress={() => setSignUp(true)} />
              <ButtonPrimary label="Login" onPress={() => setLogin(true)} />
            </>
          )}

          {signUp && <SignUp onUserCreated={onUserCreated} />}
          {login && <Login onLogin={onLogin} />}
        </View>
      </ImageBackground>
    </View>
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
    padding: 10,
    paddingTop: 40,
    flexGrow: 1,
    backgroundColor: COLORS.cardColor,

    access: {
      backgroundColor: COLORS.bgColor50,
      width: "100%",
      flex: 1,
      padding: 20,
      justifyContent: "center",
      alignItems: "center",
      paddingBottom: 60,
      borderRadius: 5,
      borderWidth: 2,
      borderColor: COLORS.primary,
    },
  },
});

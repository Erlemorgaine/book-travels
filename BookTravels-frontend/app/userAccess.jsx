import React, { useState } from "react";
import { View, ImageBackground, StyleSheet, Image } from "react-native";
import ButtonPrimary from "../components/ButtonPrimary";
// import Login from "./login";
// import SignUp from "./signup";
import AccessWrapper from "../components/AccessWrapper";

const UserAccess = () => {
  // const [login, setLogin] = useState(false);
  // const [signUp, setSignUp] = useState(false);

  return (
    <AccessWrapper>
      {/* {!login && !signUp && */}

      <Image
        style={styles.bookworm}
        source={require("../assets/bookworm_reading.webp")}
        alt="A happy bookworm reading a book"
      />
      <ButtonPrimary label="Sign up" href={{ pathname: "signup" }} />
      <ButtonPrimary label="Login" href={{ pathname: "login" }} />

      {/* } */}
      {/* {signUp && <SignUp onUserCreated={onUserCreated} />}
          {login && <Login onLogin={onLogin} />} */}
    </AccessWrapper>
  );
};

export default UserAccess;

const styles = StyleSheet.create({
  bookworm: {
    width: 187 * 0.8,
    height: 168 * 0.8,
    margin: "auto",
    marginTop: 0,
    marginBottom: 20,
  },
});

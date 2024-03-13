import React from "react";
import { Image, Text, StyleSheet } from "react-native";
import ButtonPrimary from "../components/ButtonPrimary";
import AppTitle from "../components/AppTitle";
import AccessWrapper from "../components/AccessWrapper";
import { STYLES } from "../utilities/styles/fonts";

export default Disclaimer = () => {
  return (
    <AccessWrapper>
      <Image
        style={styles.bookworm}
        source={require("../assets/bookworm_reading.webp")}
        alt="A happy bookworm reading a book"
      />
      <AppTitle title="Before we can start ... " />
      <Text style={styles.paragraph}>
        ... there's a few things you should be aware of in terms of the{" "}
        <Text style={STYLES.Bold}>data management</Text> of this app. Book
        Travels stores all data that you enter into the app on your own device.
        It's not getting sent to an external server (although in the future this
        might change, depending on new features).
      </Text>
      <Text style={styles.paragraph}>
        This means that you can use the app{" "}
        <Text style={STYLES.Bold}>offline</Text>.
      </Text>
      <Text style={styles.paragraph}>
        It also means that your data can be read by anyone who has{" "}
        <Text style={STYLES.Bold}>access</Text> to your device.
      </Text>
      <Text style={styles.paragraph}>
        Lastly, it means that if you delete this app's cached data, or if for
        some reason you have to reset your phone, you will{" "}
        <Text style={STYLES.Bold}>lose your data</Text>! The app offers you a
        possibility to <Text style={STYLES.Bold}>download</Text> your data in
        CSV format, so that you can still save your data should one of these
        situations occur.
      </Text>
      <ButtonPrimary
        label="Gotcha! Now let me add my books"
        href={{ pathname: "home" }}
      />
    </AccessWrapper>
  );
};

const styles = StyleSheet.create({
  bookworm: {
    height: 168 * 0.8,
    aspectRatio: 1.1187,
    margin: "auto",
    marginTop: 0,
    marginBottom: 20,
  },
  paragraph: {
    paddingBottom: 4,
    width: "100%",
  },
});

import { StatusBar } from "expo-status-bar";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import CountryList from "./components/CountryList";
import InteractiveMap from "./components/InteractiveMap";
import UserAccess from "./components/UserAccess";

import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import { getBooksForUser } from "./utilities/api";

import { colors } from "./utilities/colors";

export default function App() {
  const storageUserId = "bookTravels-userId";
  const [fontsLoaded] = useFonts({
    DMSans: require("./assets/fonts/DMSans-Regular.ttf"),
    DMSansBold: require("./assets/fonts/DMSans-Bold.ttf"),
    Headings: require("./assets/fonts/SpecialElite-Regular.ttf"),
  });

  const [userId, setUserId] = useState("");
  const [countryBooks, setCountryBooks] = useState(null);
  const [firstAdd, setFirstAdd] = useState(false);

  useEffect(() => {
    const storedId = localStorage.getItem(storageUserId);
    if (storedId) {
      setUserId(storedId);

      getBooksForUser(storedId).then((books) => {
        setCountryBooks(books);
      });
    }
  }, []);

  function storeUserAndCountries(id, countries) {
    localStorage.setItem(storageUserId, id);
    setUserId(id);
    setCountryBooks(countries);
  }

  function activateFirstAdd() {
    setFirstAdd(true);

    setTimeout(() => {
      setFirstAdd(false);
    }, 1000);
  }

  return (
    <ImageBackground
      source={require("./assets/paper-texture-4.jpeg")}
      style={styles.background}
    >
      {fontsLoaded && (
        <View
          style={{
            ...styles.container,
            ...colors,
          }}
        >
          {!userId && (
            <UserAccess
              onUserCreated={storeUserAndCountries}
              onLogin={storeUserAndCountries}
            />
          )}
          {countryBooks && (
            <>
              <InteractiveMap
                booksPerCountry={countryBooks}
                userId={userId}
                firstAdd={firstAdd}
                onBookListUpdate={(newBooks) => setCountryBooks(newBooks)}
              />
              <CountryList
                countryBooks={countryBooks}
                userId={userId}
                onBookListUpdate={(newBooks) => setCountryBooks(newBooks)}
                onFirstAdd={activateFirstAdd}
              />
            </>
          )}

          <StatusBar style="auto" />
        </View>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },

  container: {
    flex: 1,
    backgroundColor: "var(--bg-color-50)",
  },
});

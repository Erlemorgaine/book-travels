import { StatusBar } from "expo-status-bar";
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CountryList from "./components/CountryList";
import InteractiveMap from "./components/InteractiveMap";
import UserAccess from "./components/UserAccess";

import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import { getBooksForUser } from "./utilities/api";

import { COLORS } from "./utilities/colors";

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
    initializeUser();
  }, []);

  async function initializeUser() {
    const storedId = await AsyncStorage.getItem(storageUserId);
    if (storedId) {
      setUserId(storedId);

      getBooksForUser(storedId).then((books) => {
        setCountryBooks(books);
      });
    }
  }

  async function storeUserAndCountries(id, countries) {
    await AsyncStorage.setItem(storageUserId, id);
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
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require("./assets/paper-texture-4.jpeg")}
        style={styles.background}
      >
        {fontsLoaded && (
          <View style={styles.container}>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },

  container: {
    flex: 1,
    backgroundColor: COLORS.bgColor50,
  },
});

import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import InteractiveMap from "../components/InteractiveMap";
import CountryList from "../components/CountryList";
import { useLocalSearchParams } from "expo-router";
import { getBooks } from "../utilities/db";
import { COLORS } from "../utilities/styles/colors";

export default Home = () => {
  const { userId } = useLocalSearchParams();

  const [countriesWithBooks, setCountriesWithBooks] = useState(null);
  const [amountBooksRead, setAmountBooksRead] = useState(0);

  useEffect(() => {
    getBooks(setBooksOnUpdate);
  }, []);

  function setBooksOnUpdate(data) {
    setCountriesWithBooks(data);
    setAmountBooksRead(data.filter((country) => country.read).length);
  }

  return (
    countriesWithBooks && (
      <ImageBackground
        source={require("../assets/paper-texture-4.webp")}
        style={styles.background}
      >
        <View style={styles.container}>
          {!!countriesWithBooks?.length && (
            <InteractiveMap
              key={"map-" + amountBooksRead}
              booksPerCountry={countriesWithBooks}
              userId={userId}
              onBookListUpdate={setCountriesWithBooks}
              amountBooksRead={amountBooksRead}
            />
          )}
          <CountryList
            countryBooks={countriesWithBooks}
            userId={userId}
            onBookListUpdate={setBooksOnUpdate}
          />
        </View>
      </ImageBackground>
    )
  );
};

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

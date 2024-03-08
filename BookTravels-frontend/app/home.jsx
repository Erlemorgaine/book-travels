import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import InteractiveMap from "../components/InteractiveMap";
import CountryList from "../components/CountryList";
import { useLocalSearchParams } from "expo-router";
import { getBooksForUser } from "../utilities/api";
import { DataContext } from "../contexts/data";
import { COLORS } from "../utilities/styles/colors";

export default Home = () => {
  const { userId } = useLocalSearchParams();
  const { data } = useContext(DataContext);

  const [countriesWithBooks, setCountriesWithBooks] = useState(null);

  useEffect(() => {
    if (data?.length) {
      setCountriesWithBooks(data);
    } else {
      setCountriesWithBooks([]);
      // getBooksForUser(userId).then((books) => {
      //   setCountriesWithBooks(books);
      // });
    }
  }, []);

  return (
    countriesWithBooks && (
      <ImageBackground
        source={require("../assets/paper-texture-4.webp")}
        style={styles.background}
      >
        <View style={styles.container}>
          {!!countriesWithBooks?.length && (
            <InteractiveMap
              booksPerCountry={countriesWithBooks}
              userId={userId}
              onBookListUpdate={setCountriesWithBooks}
            />
          )}
          <CountryList
            countryBooks={countriesWithBooks}
            userId={userId}
            onBookListUpdate={setCountriesWithBooks}
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

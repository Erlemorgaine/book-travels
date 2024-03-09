import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { getBooks, removeDatabase } from "../utilities/db";

import { BottomTabsNavigator } from "../components/BottomTabs.navigator";
import { Redirect } from "expo-router";
import { storageUserId } from "../contexts/authentication";
import { setupDatabase } from "../utilities/db";

export default function App() {
  // TODO: For testing purposes, remove eventually
  // AsyncStorage.clear();

  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setupDatabase();
    initializeUser();

    // setTimeout(() => {
    //   removeDatabase();
    // }, 5000);
  }, []);

  async function initializeUser() {
    const storedId = await AsyncStorage.getItem(storageUserId);
    if (storedId) {
      setUserId(storedId);
      getBooks(setCountryBooks);
    }

    setLoading(false);
  }

  return (
    !loading && (
      <Redirect
        href={true ? { pathname: "/home" } : { pathname: "/userAccess" }}
      />
    )
  );
}

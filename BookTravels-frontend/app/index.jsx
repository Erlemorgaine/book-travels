import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { getBooks } from "../utilities/db";

import { BottomTabsNavigator } from "../components/BottomTabs.navigator";
import { Redirect } from "expo-router";
import { storageUserId } from "../contexts/authentication";
import { setupDatabase } from "../utilities/db";

export default function App() {
  // TODO: For testing purposes, remove eventually
  // AsyncStorage.clear();

  const appDisclaimerKey = "book_travels_disclaimer_shown";

  const [loading, setLoading] = useState(true);
  const [disclaimerShown, setDisclaimerShown] = useState(false);

  useEffect(() => {
    setupDatabase();
    initializeUser();
  }, []);

  async function initializeUser() {
    const disclaimerShownBefore = await AsyncStorage.getItem(appDisclaimerKey);

    if (disclaimerShownBefore) {
      setDisclaimerShown(true);
      // TODO: Store disclaimerShown in localStorage
    }

    setLoading(false);
  }

  return (
    !loading && (
      <Redirect
        href={
          disclaimerShown ? { pathname: "/home" } : { pathname: "/disclaimer" }
        }
      />
    )
  );
}

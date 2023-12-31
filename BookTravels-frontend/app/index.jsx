import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { getBooksForUser } from "../utilities/api";

import { BottomTabsNavigator } from "../components/BottomTabs.navigator";
import { Redirect } from "expo-router";
import { storageUserId } from "../contexts/authentication";

export default function App() {
  // TODO: For testing purposes, remove eventually
  // AsyncStorage.clear();

  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeUser();
  }, []);

  async function initializeUser() {
    const storedId = await AsyncStorage.getItem(storageUserId);
    if (storedId) {
      setUserId(storedId);

      // getBooksForUser(storedId).then((books) => {
      //   setCountryBooks(books);
      // });
    }

    setLoading(false);
  }

  return (
    !loading && (
      <Redirect
        href={
          userId
            ? { pathname: "/home", params: { userId } }
            : { pathname: "/userAccess" }
        }
      />
    )
  );
}

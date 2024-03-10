import { StatusBar } from "expo-status-bar";
import { ImageBackground, StyleSheet } from "react-native";

import { useFonts } from "expo-font";

import { BottomTabsNavigator } from "../components/BottomTabs.navigator";
import { Stack } from "expo-router";

export default function AppLayout() {
  const [fontsLoaded] = useFonts({
    // "DMSans-Regular": require("./assets/fonts/DMSans-Regular.ttf"),
    // "DMSans-Bold": require("./assets/fonts/DMSans-Bold.ttf"),
    "SpecialElite-Regular": require("../assets/fonts/SpecialElite-Regular.ttf"),
  });

  return (
    <>
      <ImageBackground
        source={require("../assets/paper-texture-4.webp")}
        style={styles.background}
      >
        {/* <DataContext.Provider value={{ data, setData }}> */}
        {fontsLoaded && (
          <Stack
            screenOptions={{
              headerStyle: {
                backgroundColor: "transparent",
              },
              headerShadowVisible: false,
              headerTransparent: true,
              headerBackVisible: false,
              headerTitle: "",
            }}
          />
        )}
        {/* </DataContext.Provider> */}
        {/* <SessionProvider>
        <Slot />
      </SessionProvider> */}
      </ImageBackground>
      {/* <BottomTabsNavigator /> */}
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
});

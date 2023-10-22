// import { Tabs } from "expo-router/tabs";
import React from "react";
import Home from "../app/home";
import About from "../app/about";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

const Tabs = createBottomTabNavigator();

// const BottomTabs = createBottomTabNavigator();

export const BottomTabsNavigator = () => {
  <NavigationContainer>
    <Tabs.Navigator>
      <Tabs.Screen name="Home" component={About} />
      <Tabs.Screen name="About" component={Home} />
    </Tabs.Navigator>
  </NavigationContainer>;
};

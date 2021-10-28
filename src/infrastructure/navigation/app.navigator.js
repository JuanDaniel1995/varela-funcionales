import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { InfoNavigator } from "./info.navigator";
import { MeasuresNavigator } from "./measures.navigator";
import { SettingsNavigator } from "./settings.navigator";

import { MeasuresContextProvider } from "../../services/measures/measures.context";

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  HomeMenu: "md-home",
  MeasuresMenu: "md-body",
  SettingsMenu: "md-settings",
};

const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  return {
    tabBarIcon: ({ size, color }) => (
      <Ionicons name={iconName} size={size} color={color} />
    ),
    headerShown: false,
    tabBarActiveTintColor: "tomato",
    tabBarInactiveTintColor: "gray"
  };
};

export const AppNavigator = () => (
  <MeasuresContextProvider>
    <Tab.Navigator

      screenOptions={createScreenOptions}
    >
      <Tab.Screen name="HomeMenu" component={InfoNavigator} options={{
        tabBarLabel: 'Inicio',
      }} />
      <Tab.Screen name="MeasuresMenu" component={MeasuresNavigator} options={{
        tabBarLabel: 'Mediciones',
      }} />
      <Tab.Screen name="SettingsMenu" component={SettingsNavigator} options={{
        tabBarLabel: 'Cuenta',
      }} />
    </Tab.Navigator>
  </MeasuresContextProvider>
);

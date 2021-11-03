import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { SchedulesNavigator } from "./schedules.navigator";
import { MeasuresNavigator } from "./measures.navigator";
import { SettingsNavigator } from "./settings.navigator";

import { UsersContextProvider } from "../../services/users/users.context";
import { MeasuresContextProvider } from "../../services/measures/measures.context";
import { SchedulesContextProvider } from "../../services/schedules/schedules.context";

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  SchedulesMenu: "md-calendar",
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
  <UsersContextProvider>
    <SchedulesContextProvider>
      <MeasuresContextProvider>
        <Tab.Navigator screenOptions={createScreenOptions}>
          <Tab.Screen name="SchedulesMenu" component={SchedulesNavigator} options={{
            tabBarLabel: 'Horarios',
          }} />
          <Tab.Screen name="MeasuresMenu" component={MeasuresNavigator} options={{
            tabBarLabel: 'Mediciones',
          }} />
          <Tab.Screen name="SettingsMenu" component={SettingsNavigator} options={{
            tabBarLabel: 'Cuenta',
          }} />
        </Tab.Navigator>
      </MeasuresContextProvider>
    </SchedulesContextProvider>
  </UsersContextProvider>
);

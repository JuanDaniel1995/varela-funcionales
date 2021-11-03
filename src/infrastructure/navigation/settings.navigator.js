import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import { SettingsScreen } from "../../features/settings/screens/settings.screen";
import { AccountScreen } from "../../features/account/screens/account.screen";
import { LoginScreen } from "../../features/account/screens/login.screen";
import { RegisterScreen } from "../../features/account/screens/register.screen";

const SettingsStack = createStackNavigator();

export const SettingsNavigator = () => {
  return (
    <SettingsStack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.ModalPresentationIOS,
      }}
    >
      <SettingsStack.Screen
        name="Settings"
        component={SettingsScreen}
      />
      <SettingsStack.Screen name="SettingsAccount" component={AccountScreen} />
      <SettingsStack.Screen name="SettingsLogin" component={LoginScreen} />
      <SettingsStack.Screen name="SettingsRegister" component={RegisterScreen} />
    </SettingsStack.Navigator>
  );
};

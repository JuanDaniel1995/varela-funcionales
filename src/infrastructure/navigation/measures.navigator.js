import React from "react";

import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import { MeasuresScreen } from "../../features/measures/screens/measures.screen";
import { MeasuresDetailScreen } from "../../features/measures/screens/measures-detail.screen";
import { AccountScreen } from "../../features/account/screens/account.screen";
import { LoginScreen } from "../../features/account/screens/login.screen";
import { RegisterScreen } from "../../features/account/screens/register.screen";

const MeasuresStack = createStackNavigator();

export const MeasuresNavigator = () => {
  return (
    <MeasuresStack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.ModalPresentationIOS,
      }}
    >
      <MeasuresStack.Screen
        name="Measures"
        component={MeasuresScreen}
      />
      <MeasuresStack.Screen
        name="MeasuresDetail"
        component={MeasuresDetailScreen}
      />
      <MeasuresStack.Screen name="MeasuresAccount" component={AccountScreen} />
      <MeasuresStack.Screen name="MeasuresLogin" component={LoginScreen} />
      <MeasuresStack.Screen name="MeasuresRegister" component={RegisterScreen} />
    </MeasuresStack.Navigator>
  );
};

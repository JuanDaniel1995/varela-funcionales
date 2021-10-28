import React from "react";

import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import { InfoScreen } from "../../features/info/screens/info.screen";

const RestaurantStack = createStackNavigator();

export const InfoNavigator = () => {
  return (
    <RestaurantStack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.ModalPresentationIOS,
      }}
    >
      <RestaurantStack.Screen
        name="Info"
        component={InfoScreen}
      />
    </RestaurantStack.Navigator>
  );
};

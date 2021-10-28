import React from "react";

import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import { MeasuresScreen } from "../../features/measures/screens/measures.screen";
import MeasuresDetailScreen from "../../features/measures/screens/measures-detail.screen";

const RestaurantStack = createStackNavigator();

export const MeasuresNavigator = () => {
  return (
    <RestaurantStack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.ModalPresentationIOS,
      }}
    >
      <RestaurantStack.Screen
        name="Measures"
        component={MeasuresScreen}
      />
      <RestaurantStack.Screen
        name="MeasuresDetail"
        component={MeasuresDetailScreen}
      />
    </RestaurantStack.Navigator>
  );
};

import React from "react";

import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import { SchedulesScreen } from "../../features/schedules/screens/schedules.screen";
import { SchedulesDetailScreen } from "../../features/schedules/screens/schedules-detail.screen";

const SchedulesStack = createStackNavigator();

export const SchedulesNavigator = () => {
  return (
    <SchedulesStack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.ModalPresentationIOS,
      }}
    >
      <SchedulesStack.Screen
        name="Schedules"
        component={SchedulesScreen}
      />
      <SchedulesStack.Screen
        name="SchedulesDetail"
        component={SchedulesDetailScreen}
      />
      
    </SchedulesStack.Navigator>
  );
};

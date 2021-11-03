import React, { useState, useEffect, useContext } from "react";
import { List, ActivityIndicator, Colors } from 'react-native-paper';

import { AuthenticationContext } from "../../../services/authentication/authentication.context";

import { Schedule } from "./schedule.component";

import { colors } from "../../../infrastructure/theme/colors";

export const DailySchedule = ({ dayKey, day, schedules, isLoadingSchedules, onExpandDay, onAddSchedule }) => {
  const { currentUser } = useContext(AuthenticationContext);
  const [dailySchedules, setDailySchedules] = useState([]);
  const [expanded, setExpanded] = useState(false);

  const handlePress = () => {
    if (!expanded) onExpandDay(dayKey);
    setExpanded(!expanded);
  };

  useEffect(() => {
    setDailySchedules(schedules.filter((x) => x.day === dayKey));
  }, [schedules])

  return (
    <List.Accordion title={day} expanded={expanded} onPress={handlePress} theme={{ colors: colors.brand }}>
      {currentUser?.isAdmin &&
        <List.Item
          title="Agregar horario"
          onPress={() => onAddSchedule(dayKey, day)}
          left={props => <List.Icon {...props} icon="plus" color={colors.brand.primary} />} />}
      {isLoadingSchedules
        ? <ActivityIndicator size={50} animating={true} color={Colors.blue300} />
        : <Schedule schedules={dailySchedules} />
      }
    </List.Accordion>
  )
}
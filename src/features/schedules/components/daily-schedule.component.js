import React, { useState, useEffect, useContext } from "react";
import { StyleSheet } from "react-native";
import { List, Colors } from 'react-native-paper';

import { AuthenticationContext } from "../../../services/authentication/authentication.context";

import { Schedule } from "./schedule.component";
import { InnerLoading, Accordion } from "./schedules.styles";

import { colors } from "../../../infrastructure/theme/colors";
import { themeFonts } from "../../../infrastructure/theme/fonts";

export const DailySchedule = ({ dayKey, day, schedules, isLoadingSchedules, onExpandDay, onAddSchedule, showDialog, onToggleSnackBar }) => {
  const { currentUser } = useContext(AuthenticationContext);
  const [dailySchedules, setDailySchedules] = useState([]);
  const [expanded, setExpanded] = useState(false);

  const handlePress = () => {
    if (!expanded) onExpandDay(dayKey);
    setExpanded(!expanded);
  };

  const groupPersonsBySchedule = (daySchedules, timeSlot) => (
    daySchedules.filter((y) => y.timeSlot === timeSlot)
      .map((y) => ({ id: y.id, person: y.person })))

  useEffect(() => {
    const daySchedules = schedules.filter((x) => x.day === dayKey);
    const uniqueTimeSlots = Array.from(new Set(daySchedules.map((x) => x.timeSlot)));
    const schedulesGrouped = uniqueTimeSlots.map((x) => ({ id: x, timeSlot: x, persons: groupPersonsBySchedule(daySchedules, x) }));
    setDailySchedules(schedulesGrouped);
  }, [schedules])

  return (
    <Accordion
      title={day}
      expanded={expanded}
      titleStyle={expanded ? styles.headerExpanded : styles.headerCollapsed}
      onPress={handlePress}
      theme={{ colors: colors.brand, fonts: themeFonts }}>
      {currentUser?.isAdmin &&
        <List.Item
          title="Agregar horario"
          titleStyle={styles.text}
          onPress={() => onAddSchedule(dayKey, day)}
          left={props => <List.Icon {...props} icon="plus" color={colors.brand.primary} />} />}
      {isLoadingSchedules
        ? <InnerLoading size={50} animating={true} color={Colors.blue300} />
        : <Schedule schedules={dailySchedules} isAdmin={currentUser?.isAdmin} showDialog={showDialog} />
      }
    </Accordion>
  )
}

const styles = StyleSheet.create({
  headerExpanded: {
    fontFamily: 'Lato-Black',
  },
  headerCollapsed: {
    fontFamily: 'Lato-Regular',
  },
  text: {
    fontFamily: 'Lato-Light',
  },
})
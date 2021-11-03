import React from "react";
import { Text } from "react-native";
import { List } from 'react-native-paper';

import { ScheduleRowTextContainer, ScheduleRowMainText } from "./schedules.styles";

export const ScheduleRow = ({ timeSlot, person, titleStyle }) => (
  <ScheduleRowTextContainer style={titleStyle}>
    <ScheduleRowMainText>{timeSlot}</ScheduleRowMainText>
    <Text>{person}</Text>
  </ScheduleRowTextContainer>
)

export const Schedule = ({ schedules }) => (
  schedules.length
    ? schedules.map(({ id, timeSlot, person }) => (
      <List.Item key={id} title={<ScheduleRow timeSlot={timeSlot} person={person} />} />
    ))
    : <List.Item title='No hay clases para el dia' />
)
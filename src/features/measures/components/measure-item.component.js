import React from "react";
import { List } from 'react-native-paper';

export const Measure = ({ userMeasures }) => (
  userMeasures.length
    ? userMeasures.map(({ id, toBeMeasured, measure }) => (
      <List.Item key={id} title={`${toBeMeasured}: ${measure}`} />
    ))
    : <List.Item title='No hay mediciones para el usuario' />
)
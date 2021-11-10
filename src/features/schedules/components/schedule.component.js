import React from "react";
import { StyleSheet } from "react-native";
import { List } from 'react-native-paper';

import { InnerAccordion } from "./schedules.styles";

import { colors } from "../../../infrastructure/theme/colors";
import { themeFonts } from "../../../infrastructure/theme/fonts";

export const Schedule = ({ schedules, showDialog, isAdmin }) => {
  const removePersonFromClass = (timeSlot, person, id) => {
    showDialog('Atención', `¿Deseas eliminar a ${person} de la clase de las ${timeSlot}?`, id);
  }

  return (
    schedules.length
      ? schedules.map(({ id, timeSlot, persons }) => (
        <List.AccordionGroup key={id}>
          <InnerAccordion titleStyle={styles.primaryText} title={timeSlot} id={id} theme={{ colors: colors.brand, fonts: themeFonts }}>
            {persons.map(({ id, person }) => (
              <List.Item
                title={person}
                style={styles.personContainer}
                key={id}
                titleStyle={styles.secondaryText}
                onPress={() => isAdmin ? removePersonFromClass(timeSlot, person, id) : null}
                right={props => isAdmin ? <List.Icon {...props} icon="trash-can" color={colors.brand.primary} /> : null} />
            ))}
          </InnerAccordion>
        </List.AccordionGroup>

      ))
      : <List.Item title='No hay clases para el dia' titleStyle={styles.secondayText} />
  )
}

const styles = StyleSheet.create({
  primaryText: {
    fontFamily: 'Lato-Bold',
    color: colors.brand.accent,
    textAlign: 'center'
  },
  secondaryText: {
    fontFamily: 'Lato-Light',
    width: '100%'
  },
  personContainer: {
    backgroundColor: '#F8F8F8',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  }
})
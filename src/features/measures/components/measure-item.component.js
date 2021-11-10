import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { List } from 'react-native-paper';

import { InnerAccordion } from "./measures.styles";

import { colors } from "../../../infrastructure/theme/colors";

export const Measure = ({ userFolds, userMeasures, isAdmin, user, onAddMeasure, forceCollapseUsers }) => {
  const [foldsExpanded, setFoldsExpanded] = useState(false);
  const [measuresExpanded, setMeasuresExpanded] = useState(false);

  useEffect(() => {
    if (forceCollapseUsers) {
      setFoldsExpanded(false);
      setMeasuresExpanded(false);
    }
  }, [forceCollapseUsers])

  return (
    userMeasures.length
      ?
      <>
        <List.AccordionGroup>
          <InnerAccordion title="Pliegues" id="folds" titleStyle={styles.primaryText} expanded={foldsExpanded}>
            {userFolds.map(({ key, toBeMeasured, measure, id }) => (
              <List.Item
                style={styles.scheduleContainer}
                titleStyle={styles.text}
                onPress={() => isAdmin ? onAddMeasure(user, toBeMeasured, measure, id) : null}
                right={props => isAdmin ? <List.Icon {...props} icon="pencil" color={colors.brand.accent} /> : null}
                key={key}
                title={`${toBeMeasured}: ${measure}`} />
            ))}
          </InnerAccordion>
        </List.AccordionGroup>
        <List.AccordionGroup>
          <InnerAccordion title="Mediciones" id="measures" titleStyle={styles.primaryText} expanded={measuresExpanded}>
            {userMeasures.map(({ key, toBeMeasured, measure, id }) => (
              <List.Item
                style={styles.scheduleContainer}
                titleStyle={styles.text}
                onPress={() => isAdmin ? onAddMeasure(user, toBeMeasured, measure, id) : null}
                right={props => isAdmin ? <List.Icon {...props} icon="pencil" color={colors.brand.accent} /> : null}
                key={key}
                title={`${toBeMeasured}: ${measure}`} />
            ))}
          </InnerAccordion>
        </List.AccordionGroup>
      </>
      : <List.Item title='No hay mediciones para el usuario' />
  )
}

const styles = StyleSheet.create({
  primaryText: {
    fontFamily: 'Lato-Bold',
    color: colors.brand.accent,
    textAlign: 'center'
  },
  text: {
    fontFamily: 'Lato-Light',
  },
  scheduleContainer: {
    backgroundColor: '#F8F8F8',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  }
})
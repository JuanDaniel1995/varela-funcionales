import React, { useState, useEffect, useContext } from "react";
import { Chip, Colors } from "react-native-paper";
import { Text, ScrollView } from "react-native";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";

import { MeasuresContext } from "../../../services/measures/measures.context";

import { MeasureButton } from "../components/measures-detail.styles";
import { Container, MeasureInput } from "../components/measures.styles";

export const MeasuresDetailScreen = ({ navigation, route }) => {
  const {
    saveUserMeasure,
    updateUserMeasure,
    isSavingUserMeasures
  } = useContext(MeasuresContext);
  const { user, period, toBeMeasured, initialMeasure, id } = route.params;
  const [measure, setMeasure] = useState(initialMeasure.toString());

  const saveMeasure = async () => {
    const measureToNumber = Number.parseFloat(measure);
    if (id) await updateUserMeasure(user.uid, period, toBeMeasured, measureToNumber, id);
    else await saveUserMeasure(user.uid, period, toBeMeasured, measureToNumber);
    navigation.goBack();
  }

  return (
    <SafeArea>
      <ScrollView>
        <Container>
          <Spacer position="top" size="large">
            <MeasureInput label="Usuario" value={user.displayName} editable={false} />
          </Spacer>
          <Spacer position="top" size="large">
            <MeasureInput label="Periodo" value={period} editable={false} />
          </Spacer>
          <Spacer position="top" size="large">
            <MeasureInput label="Pliegue/Otros" value={toBeMeasured} editable={false} />
          </Spacer>
          <Spacer position="top" size="large">
            <MeasureInput label="Medicion" value={measure} keyboardType="numeric" onChangeText={setMeasure} />
          </Spacer>
          <Spacer position="top" size="large">
            <MeasureButton
              mode="contained"
              loading={isSavingUserMeasures}
              disabled={isSavingUserMeasures || !toBeMeasured || !measure}
              onPress={saveMeasure}>
              Guardar
            </MeasureButton>
          </Spacer>
        </Container>
      </ScrollView>
    </SafeArea >
  )
}

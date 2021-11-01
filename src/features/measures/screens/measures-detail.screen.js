import React, { useState, useEffect, useContext } from "react";
import { Chip, Colors } from "react-native-paper";
import { Text, ScrollView } from "react-native";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";

import { MeasuresContext } from "../../../services/measures/measures.context";

import { SuggestionsContainer, MeasureButton } from "../components/measures-detail.styles";
import { Container, Loading, LoadingContainer, MeasureInput } from "../components/measures.styles";

const MeasuresDetailScreen = ({ navigation, route }) => {
  const {
    toBeMeasuredSuggestions,
    isLoadingToBeMeasuredSuggestions,
    retrieveToBeMeasuredSuggestions,
    saveToBeMeasuredSuggestions,
    saveUserMeasure,
    isSavingUserMeasures
  } = useContext(MeasuresContext);
  const { user, period } = route.params;
  const [toBeMeasured, setToBeMeasured] = useState('');
  const [measure, setMeasure] = useState('');
  const [suggestionsToBeDisplayed, setSuggestionsToBeDisplayed] = useState([]);

  const saveMeasure = async () => {
    const toBeMeasuredSuggestionExists = toBeMeasuredSuggestions.some(({ suggestion }) => suggestion === toBeMeasured)
    if (!toBeMeasuredSuggestionExists) await saveToBeMeasuredSuggestions(toBeMeasured);
    const measureToNumber = Number.parseFloat(measure);
    await saveUserMeasure(user.uid, period, toBeMeasured, measureToNumber);
    navigation.goBack();
  }


  useEffect(() => {
    retrieveToBeMeasuredSuggestions();
  }, [])

  useEffect(() => {
    const suggestions = toBeMeasuredSuggestions
      .filter(({ suggestion }) => toBeMeasured && suggestion.toLowerCase().includes(toBeMeasured.toLowerCase()) && suggestion.toLowerCase() !== toBeMeasured.toLowerCase());
    setSuggestionsToBeDisplayed(suggestions);
  }, [toBeMeasuredSuggestions, toBeMeasured])

  return (
    isLoadingToBeMeasuredSuggestions ? (
      <LoadingContainer>
        <Loading size={50} animating={true} color={Colors.blue300} />
      </LoadingContainer>)
      : (
        <SafeArea>
          <ScrollView>
            <Container>
              <Spacer position="top" size="large">
                <MeasureInput label="Usuario" value={user.displayName} editable={false} />
              </Spacer>
              <Spacer position="top" size="large">
                <MeasureInput label="Periodo" value={period} editable={false} />
              </Spacer>
              {!!toBeMeasuredSuggestions.length && (
                <Spacer position="top" size="large">
                  <Text>Sugerencias</Text>
                  <SuggestionsContainer>
                    {suggestionsToBeDisplayed.slice(0, 2).map(({ id, suggestion }) => (
                      <Chip key={id} onPress={() => setToBeMeasured(suggestion)}>{suggestion}</Chip>
                    ))}
                  </SuggestionsContainer>
                </Spacer>
              )
              }
              <Spacer position="top" size="large">
                <MeasureInput label="Pliegue/Otros" value={toBeMeasured} onChangeText={setToBeMeasured} />
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
  )
}

export default MeasuresDetailScreen
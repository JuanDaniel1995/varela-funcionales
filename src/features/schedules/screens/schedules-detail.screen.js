import React, { useState, useEffect, useContext, useCallback } from "react";
import { Chip, Colors } from "react-native-paper";
import { Text, ScrollView, TouchableOpacity } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';

import { SafeArea } from "../../../components/utility/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";

import { UsersContext } from "../../../services/users/users.context";
import { SchedulesContext } from "../../../services/schedules/schedules.context";

import { Container, Loading, LoadingContainer, SuggestionsContainer, ScheduleButton, ScheduleInput } from "../components/schedules.styles";

import moment from 'moment';

export const SchedulesDetailScreen = ({ navigation, route }) => {
  const { users, isLoading, retrieveUsers } = useContext(UsersContext);
  const { isSaving, saveSchedule } = useContext(SchedulesContext);
  const { dayKey, day } = route.params;
  const [suggestionsToBeDisplayed, setSuggestionsToBeDisplayed] = useState([]);
  const [date, setDate] = useState(null);
  const [user, setUser] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [showHourPicker, setShowHourPicker] = useState(false);

  const showPicker = useCallback((value) => setShowHourPicker(value), []);

  const onValueChange = useCallback(
    (event, newDate) => {
      const selectedDate = newDate || date;
      showPicker(false);
      setDate(selectedDate);
    },
    [date, showHourPicker],
  );

  const saveMeasure = async () => {
    await saveSchedule(dayKey, timeSlot, user);
    navigation.goBack();
  }

  useEffect(() => {
    if (date) setTimeSlot(moment(date).format("hh:mm A"));
  }, [date])

  useEffect(() => {
    retrieveUsers();
  }, [])

  useEffect(() => {
    const suggestions = users
      .filter(({ displayName }) => user && displayName.toLowerCase().includes(user.toLowerCase()) && displayName.toLowerCase() !== user.toLowerCase())
      .map((suggestion) => ({ id: suggestion.uid, suggestion: suggestion.displayName }));
    setSuggestionsToBeDisplayed(suggestions);
  }, [users, user])

  return (
    isLoading ? (
      <LoadingContainer>
        <Loading size={50} animating={true} color={Colors.blue300} />
      </LoadingContainer>)
      : (
        <SafeArea>
          <ScrollView>
            <Container>
              {!!users.length && (
                <Spacer position="top" size="large">
                  <Text>Sugerencias</Text>
                  <SuggestionsContainer>
                    {suggestionsToBeDisplayed.slice(0, 2).map(({ id, suggestion }) => (
                      <Chip key={id} onPress={() => setUser(suggestion)}>{suggestion}</Chip>
                    ))}
                  </SuggestionsContainer>
                </Spacer>
              )
              }
              <Spacer position="top" size="large" >
                <ScheduleInput label="Usuario" value={user} onChangeText={setUser} />
              </Spacer>
              <Spacer position="top" size="large">
                <ScheduleInput label="Día" value={day} editable={false} />
              </Spacer>
              <Spacer position="top" size="large">
                <TouchableOpacity onPress={() => showPicker(true)}>
                  <ScheduleInput label="Horario" value={timeSlot} editable={false} />
                </TouchableOpacity>
              </Spacer>
              {showHourPicker && (
                <DateTimePicker
                  value={date || new Date()}
                  mode="time"
                  is24Hour={false}
                  display="default"
                  onChange={onValueChange}
                />
              )}
              <Spacer position="top" size="large">
                <ScheduleButton
                  mode="contained"
                  loading={isSaving}
                  disabled={isSaving || !timeSlot || !user}
                  onPress={saveMeasure}>
                  Guardar
                </ScheduleButton>
              </Spacer>
            </Container>
          </ScrollView>
        </SafeArea >

      )
  )
}

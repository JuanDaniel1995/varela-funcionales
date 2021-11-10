import React, { useContext, useState } from "react";
import { Button, Paragraph, Dialog, Portal, DefaultTheme, Provider, Snackbar } from 'react-native-paper';

import { Spacer } from "../../../components/spacer/spacer.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { SchedulesContext } from "../../../services/schedules/schedules.context";

import { Container, SchedulesList, CancelButton } from "../components/schedules.styles";
import { DailySchedule } from "../components/daily-schedule.component";

import { colors } from "../../../infrastructure/theme/colors";

const days = [
  { key: 'monday', display: 'Lunes' },
  { key: 'tuesday', display: 'Martes' },
  { key: 'wednesday', display: 'Miércoles' },
  { key: 'thursday', display: 'Jueves' },
  { key: 'friday', display: 'Viernes' },
  { key: 'saturday', display: 'Sábado' }
]

const paperTheme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.brand.primary,
  },
};

export const SchedulesScreen = ({ navigation }) => {
  const { schedules, retrieveDailySchedules, removeSchedule, isLoadingSchedules } = useContext(SchedulesContext);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogContent, setDialogContent] = useState('');
  const [recordId, setRecordId] = useState('');
  const [expandedDays, setExpandedDays] = useState([]);
  const [dayFetched, setDayFetched] = useState(null);

  const onExpandDay = (dayKey) => {
    if (!expandedDays.includes(dayKey)) {
      setDayFetched(dayKey);
      const expandedItems = [...expandedDays, dayKey];
      setExpandedDays(expandedItems);
      retrieveDailySchedules(dayKey);
    }
  }

  const onAddSchedule = (dayKey, day) => {
    navigation.navigate("SchedulesDetail", { dayKey, day });
  }

  const removeRecord = () => {
    removeSchedule(recordId);
    setDialogVisible(false);
  }

  const onToggleSnackBar = () => setSnackbarVisible(!snackbarVisible);

  const onDismissSnackBar = () => setSnackbarVisible(false);

  const showDialog = (title, content, id) => {
    setDialogTitle(title);
    setDialogContent(content);
    setRecordId(id);
    setDialogVisible(true);
  };

  const hideDialog = () => setDialogVisible(false);

  return (
    <SafeArea>
      <Container>
        <Snackbar
          visible={snackbarVisible}
          onDismiss={onDismissSnackBar}>
          Debes iniciar sesión y ser administrador para poder eliminar registros
        </Snackbar>
        <Provider theme={paperTheme}>
          <Portal>
            <Dialog visible={dialogVisible} onDismiss={hideDialog}>
              <Dialog.Title>{dialogTitle}</Dialog.Title>
              <Dialog.Content>
                <Paragraph>{dialogContent}</Paragraph>
              </Dialog.Content>
              <Dialog.Actions>
                <CancelButton onPress={hideDialog}>No</CancelButton>
                <Button onPress={removeRecord}>Sí</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
          <SchedulesList
            data={days}
            renderItem={({ item }) => {
              return (
                <Spacer position="bottom" size="medium">
                  <DailySchedule
                    key={item.key}
                    dayKey={item.key}
                    day={item.display}
                    schedules={schedules}
                    isLoadingSchedules={isLoadingSchedules && dayFetched === item.key}
                    onExpandDay={onExpandDay}
                    onAddSchedule={onAddSchedule}
                    showDialog={showDialog}
                    onToggleSnackBar={onToggleSnackBar}
                  />
                </Spacer>
              );
            }}
            keyExtractor={(item) => item.key}
          />
        </Provider>
      </Container>
    </SafeArea>
  )
}

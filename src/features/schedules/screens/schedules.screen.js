import React, { useContext, useState } from "react";

import { Spacer } from "../../../components/spacer/spacer.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { SchedulesContext } from "../../../services/schedules/schedules.context";

import { Container, SchedulesList } from "../components/schedules.styles";
import { DailySchedule } from "../components/daily-schedule.component";

const days = [
  { key: 'monday', display: 'Lunes' },
  { key: 'tuesday', display: 'Martes' },
  { key: 'wednesday', display: 'Miércoles' },
  { key: 'thursday', display: 'Jueves' },
  { key: 'friday', display: 'viernes' },
  { key: 'saturday', display: 'Sábado' }
]

export const SchedulesScreen = ({ navigation }) => {
  const { schedules, retrieveDailySchedules, isLoadingSchedules } = useContext(SchedulesContext);
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
    navigation.navigate("SchedulesDetail", { dayKey, day })
  }

  return (
    <SafeArea>
      <Container>
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
                />
              </Spacer>
            );
          }}
          keyExtractor={(item) => item.key}
        />
      </Container>
    </SafeArea>
  )
}
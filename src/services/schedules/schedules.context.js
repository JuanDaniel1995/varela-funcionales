import React, { useState, createContext } from "react";
import firestore from '@react-native-firebase/firestore';

export const SchedulesContext = createContext();

export const SchedulesContextProvider = ({ children }) => {
  const [schedules, setSchedules] = useState([]);
  const [isLoadingSchedules, setIsLoadingSchedules] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const retrieveDailySchedules = async (day) => {
    setIsLoadingSchedules(true);
    try {
      let schedulesData = [...schedules]
      let schedulesDocument = null;
      schedulesDocument = await firestore().collection('schedules').where('day', '==', day).get();
      schedulesDocument.forEach((doc) => {
        schedulesData = [...schedulesData, { id: doc.id, ...doc.data() }];
      });
      const orderedSchedules = schedulesData.sort(orderSchedules);
      setSchedules(orderedSchedules);
    } catch (e) {
      console.log(`retrieveSchedules error ${e}`);
    } finally {
      setIsLoadingSchedules(false);
    }
  }

  const saveSchedule = async (day, timeSlot, person) => {
    const scheduleData = { day, timeSlot, person };
    setIsSaving(true);
    try {
      const savedSchedule = await firestore()
        .collection('schedules')
        .add(scheduleData);
      const orderedSchedules = [...schedules, { id: savedSchedule.id, ...scheduleData }].sort(orderSchedules);
      setSchedules(orderedSchedules);
    } catch (e) {
      console.log(`saveSchedule error ${e}`);
    } finally {
      setIsSaving(false);
    }
  }

  const orderSchedules = (a, b) => {
    if (a.timeSlot.includes('AM') && b.timeSlot.includes('PM')) return -1;
    else if (a.timeSlot.includes('PM') && b.timeSlot.includes('AM')) return 1;
    else {
      const timeSlotA = a.timeSlot.split(' ');
      const timeSlotB = b.timeSlot.split(' ');
      if (timeSlotA < timeSlotB) return -1;
      if (timeSlotA > timeSlotB) return 1;
    }
  }

  return (
    <SchedulesContext.Provider
      value={{
        schedules,
        isLoadingSchedules,
        isSaving,
        retrieveDailySchedules,
        saveSchedule,
      }}
    >
      {children}
    </SchedulesContext.Provider>
  );
}
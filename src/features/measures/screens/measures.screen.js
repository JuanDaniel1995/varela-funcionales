import React, { useContext, useEffect, useState, useCallback } from "react";
import { Colors } from "react-native-paper";
import MonthPicker from 'react-native-month-year-picker';

import { FadeInView } from "../../../components/animations/fade.animation";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";

import { MeasuresContext } from "../../../services/measures/measures.context";

import { Search } from "../components/search.component";
import { UserMeasure } from "../components/user-measure-item.component";
import { Container, Loading, LoadingContainer, MeasureInput, PeriodInput, PeriodContainer } from "../components/measures.styles";
import { MeasuresList } from "../components/measure-list.styles";

import moment from 'moment';

export const MeasuresScreen = ({ navigation }) => {
  const {
    users,
    measures,
    isLoadingUsers,
    isLoadingMeasures,
    retrieveUsers,
    retrieveUserMeasures,
    clearMeasures,
  } = useContext(MeasuresContext);

  const [expandedUsers, setExpandedUsers] = useState([]);
  const [uidFetched, setUidFetched] = useState(null);
  const [date, setDate] = useState(new Date());
  const [period, setPeriod] = useState('');
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [forceCollapseUsers, setForceCollapseUsers] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  const showPicker = useCallback((value) => setShowMonthPicker(value), []);

  const onValueChange = useCallback(
    (event, newDate) => {
      const selectedDate = newDate || date;
      setShowMonthPicker(false);
      setDate(selectedDate);
      setForceCollapseUsers(true);
      setForceCollapseUsers(false);
      clearMeasures();
      setExpandedUsers([]);
    },
    [date, showMonthPicker],
  );

  const onExpandUser = (uid) => {
    if (!expandedUsers.includes(uid)) {
      setUidFetched(uid);
      const expandedItems = [...expandedUsers, uid];
      setExpandedUsers(expandedItems);
      retrieveUserMeasures(uid, period);
    }
  }

  const onAddMeasure = (user) => {
    navigation.navigate("MeasuresDetail", { user, period })
  }

  useEffect(() => {
    setPeriod(moment(date).format("MM-YYYY"));
  }, [date])

  useEffect(() => {
    retrieveUsers();
  }, [])

  useEffect(() => {
    if (!searchKeyword) setFilteredUsers(users);
    else {
      const userList = users
        .filter(({ displayName }) => displayName.toLowerCase().includes(searchKeyword.toLowerCase()));
      setFilteredUsers(userList)
    }
  }, [users, searchKeyword])

  return (
    isLoadingUsers ? (
      <LoadingContainer>
        <Loading size={50} animating={true} color={Colors.blue300} />
      </LoadingContainer>)
      : (
        <SafeArea>
          <Container>
            <Search onSubmit={setSearchKeyword} />
            <PeriodContainer onPress={() => showPicker(true)}>
              <PeriodInput label="Periodo" value={period} editable={false} />
            </PeriodContainer>
            {showMonthPicker && <MonthPicker onChange={onValueChange} value={date} />}
            <MeasuresList
              data={filteredUsers}
              renderItem={({ item }) => {
                return (
                  <Spacer position="bottom" size="large">
                    <FadeInView>
                      <UserMeasure
                        user={item}
                        measures={measures}
                        isLoadingMeasures={isLoadingMeasures && uidFetched === item.uid}
                        forceCollapseUsers={forceCollapseUsers}
                        onExpandUser={onExpandUser}
                        onAddMeasure={onAddMeasure}
                      />
                    </FadeInView>
                  </Spacer>
                );
              }}
              keyExtractor={(item) => item.email}
            />
          </Container>
        </SafeArea>
      )
  );
}

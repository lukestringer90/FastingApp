/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import moment from 'moment';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';

type Nullable<T> = T | null;

function App(): JSX.Element {
  const [startDate, setStartDate] = useState<Nullable<moment.Moment>>();
  const [endDate, setEndDate] = useState<Nullable<moment.Moment>>();
  const [_, setTime] = useState(new Date());

  const {getItem, setItem, removeItem} = useAsyncStorage('@startDate');

  const readStartDate = async () => {
    const jsonValue = await getItem();
    const date = jsonValue != null ? JSON.parse(jsonValue) : null;
    setStartDate(date);
  };

  const writeStartDate = async (date: Nullable<moment.Moment>) => {
    if (date == null) {
      removeItem();
      setStartDate(null);
    } else {
      const jsonValue = JSON.stringify(date);
      await setItem(jsonValue);
      setStartDate(date);
    }
  };

  useEffect(() => {
    // readStartDate();
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeText = () => {
    // No time started, ever
    if (startDate == null && endDate == null) {
      return null;
    }

    const endDateToUse = endDate ?? moment();
    const duration = endDateToUse.from(startDate, true);

    // Currently fasting
    if (startDate != null && endDate == null) {
      return `Fasted for ${duration} ⏳`;
    }
    // Finished fasting
    else if (startDate != null && endDate != null) {
      return `Fast of ${duration} finished 🥣`;
    }
  };

  const buttonTapped = () => {
    // First launch
    if (startDate == null && endDate == null) {
      const start = moment();
      writeStartDate(start);
    }
    // Currently fasting
    else if (endDate == null) {
      // So stop
      const end = moment();
      setEndDate(end);
    }
    // Stopped fasting
    else if (startDate != null && endDate != null) {
      // So start
      const start = moment();
      writeStartDate(start);
      setEndDate(null);
    }
  };

  const buttonText = () => {
    // First launch
    if (startDate == null && endDate == null) {
      return 'Start Fasting';
    }
    // Current fasting
    else if (startDate != null && endDate == null) {
      return 'Stop Fasting';
    }

    // startDate != null && endDate != null
    // Finished
    return 'Start Fasting';
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.text}>{timeText()}</Text>
        <Button onPress={buttonTapped} title={buttonText()} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  text: {
    textAlign: 'center',
    marginVertical: 8,
    fontSize: 24,
  },
});

export default App;

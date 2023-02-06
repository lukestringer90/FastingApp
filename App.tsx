/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import moment from 'moment';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';

type Nullable<T> = T | null;

function App(): JSX.Element {
  const [startDate, setStartDate] = useState<Nullable<moment.Moment>>();
  const [_, setTime] = useState(new Date());

  const {getItem, setItem, removeItem} = useAsyncStorage('@startDate');

  const readItemFromStorage = async () => {
    const jsonValue = await getItem();
    const date = jsonValue != null ? JSON.parse(jsonValue) : null;
    setStartDate(date);
  };

  const writeItemToStorage = async (date: Nullable<moment.Moment>) => {
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
    readItemFromStorage();
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeSinceStartedFasting = () => {
    if (startDate == null) {
      return 'None';
    }

    const now = moment();
    const seconds = now.diff(startDate, 'seconds');
    const minutes = now.diff(startDate, 'minutes');
    const hours = now.diff(startDate, 'hours');

    return `${hours}hr ${minutes}min ${seconds}sec`;
  };

  const startTapped = () => {
    if (startDate == null) {
      const start = moment();
      writeItemToStorage(start);
    } else {
      Alert.alert(
        '',
        `You fasted for a total of ${timeSinceStartedFasting()}`,
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      );
      writeItemToStorage(null);
    }
  };

  const buttonText =
    startDate == null ? '🟢 Start Fasting 🟢' : '🔴 Stop Fasting 🔴';

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Button onPress={startTapped} title={buttonText} />
        <Text style={styles.text}>
          Fasting for: {timeSinceStartedFasting()}
        </Text>
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
  },
});

export default App;

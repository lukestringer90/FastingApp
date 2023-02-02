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

function App(): JSX.Element {
  const [startDate, setStartDate] = useState<moment.Moment | null>();
  const [_, setTime] = useState(new Date());

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
    const diff = now.diff(startDate, 'seconds');

    return `${diff} seconds`;
  };

  const startTapped = () => {
    if (startDate == null) {
      const start = moment();
      setStartDate(start);
    } else {
      Alert.alert(
        '',
        `You fasted for a total of ${timeSinceStartedFasting()}`,
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      );
      setStartDate(null);
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

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {Fast} from './fast';
import moment from 'moment';

function App(): JSX.Element {
  const [fast, setFast] = useState<Fast>(new Fast(null, null));
  const [_, setTime] = useState(new Date());

  const secondsUntilReload = 1 * 1000; // every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, secondsUntilReload);

    return () => clearInterval(interval);
  }, []);

  const buttonTapped = () => {
    // First launch
    if (fast.start == null && fast.end == null) {
      console.log('First Launch');
      const start = moment();

      let newFast = fast.clone();
      newFast.start = start;
      setFast(newFast);
    }
    // Currently fasting
    else if (fast.end == null) {
      console.log('Currently Fasting');
      // So stop
      const end = moment();
      let newFast = fast.clone();
      newFast.end = end;
      setFast(newFast);
    }
    // Stopped fasting
    else if (fast.start != null && fast.end != null) {
      console.log('Stopped Fasting');
      // So start
      const start = moment();

      let newFast = fast.clone();
      newFast.start = start;
      newFast.end = null;

      setFast(newFast);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.text}>{fast.timeText()}</Text>
        <Button onPress={buttonTapped} title={fast.buttonText()} />
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

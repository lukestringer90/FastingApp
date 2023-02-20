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

function App(): JSX.Element {
  const [fast, setFast] = useState<Fast>(new Fast());
  const [_, setTime] = useState(new Date());

  const secondsUntilReload = 1 * 1000; // every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, secondsUntilReload);

    return () => clearInterval(interval);
  }, []);

  const buttonTapped = () => {
    setFast(fast.next());
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

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

  const {getItem, setItem, removeItem} = useAsyncStorage('@fast');

  const readFast = async () => {
    console.log('Reading Fast');
    const jsonValue = await getItem();
    console.log(`Read: ${jsonValue}`);

    const loadedFast = jsonValue != null ? JSON.parse(jsonValue) : new Fast();
    setFast(loadedFast);
  };

  const writeFast = async (fastToWrite: Fast) => {
    const jsonValue = JSON.stringify(fast);
    console.log(`To write:: ${jsonValue}`);
    await setItem(jsonValue);
    setFast(fastToWrite);
  };

  useEffect(() => {
    // On first load read the Fast from storage
    readFast();
  }, []);

  const buttonTapped = () => {
    // Get to the next stage of the Fast
    const next = fast.next();

    // Remove current stage
    removeItem();

    // Progress to next stage
    writeFast(next);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {/*                                       ⌄ Crash here - TypeError: undefined is not a function*/}
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

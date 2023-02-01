/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';

function App(): JSX.Element {
  const [startDate, setStartDate] = useState<Date | undefined>();

  const formattedStartTime = () => {
    if (startDate == null) {
      return 'None';
    }

    var options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    };

    const formatted = startDate.toLocaleString('en-GB', options);
    return formatted;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Button
          onPress={() => {
            const newDate = new Date();
            setStartDate(newDate);
          }}
          title="Start Timer"
        />
        <Text style={styles.text}>Started at: {formattedStartTime()}</Text>
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

import React, { useState } from 'react';
import { View, Image, Text, Button, StyleSheet, StatusBar, SafeAreaView, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import ScheduleContainer from './components/scheduleContainer';

const ScheduleScreens = (props) => {
  console.log('hi from schedules', props.bData[0]);
  const name = props.bData[0].Name;
  const [currentUserData, setUserData] = useState(props.bData[0].currentData);
  const [currentTime, setCurrentTime] = useState(moment().format('ddd. MMM. Do YYYY'));
  console.log(currentTime);

  return (
    <SafeAreaView style={styles.container} >
      <Text style={{
        color: 'darkgreen',
        fontSize: 28,
        marginTop: 30,
        marginLeft: 30,
        fontWeight: 'bold'
      }}>
        <Text>Your Weekly Schedule</Text>
      </Text>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 80,
      }}>
        <TextInput style={styles.input1} placeholder="Got more leftovers? Add them here!" />
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 50,
            width: 5,
            height: 5,
            ...styles.shadow
          }}
          onPress={() => alert('hi')}
        >
          <FontAwesomeIcon icon={faPlusCircle} size={40} color={'darkgreen'} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView} >
        <View >
          <Text style={{
            color: 'darkgreen',
            fontSize: 16,
          }}>
            <Text>Tasks as of today: </Text>
            <Text style={{fontWeight: 'bold'}}>{currentTime}</Text>
          </Text>
        </View>
        <View>
          {currentUserData.map((leftover, index) => <ScheduleContainer leftover={leftover} key={index} index={index} length={currentUserData.length}/>)}
        </View>
      </ScrollView>
    </SafeAreaView >
  );
};

export default ScheduleScreens;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#fff',
  },
  scrollView: {
    backgroundColor: '#fff',
    marginHorizontal: 30,
    marginBottom: 85,
  },
  input1: {
    width: '70%',
    height: 40,
    marginLeft: 30,
    marginRight: 15,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  buttonSearch: {
    marginRight: 30,
  },
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5
  }
});

{/* <Text>Schedule</Text>
<Button title="Click Here" onPress={() => alert('Button Clicked!')} /> */}
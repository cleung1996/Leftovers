import React, { useState } from 'react';
import { View, Image, Input, Text, Button, StyleSheet, StatusBar, SafeAreaView, ScrollView, TextInput, TouchableOpacity, Modal } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment';
import DropDownPicker from 'react-native-dropdown-picker';

import ScheduleContainer from './components/scheduleContainer';

const ScheduleScreens = (props) => {
  const getAvg = () => {
    const completedTotal = (previousValue, currentValue) => previousValue + currentValue.Completed;
    const accomplished = currentUserData.reduce(completedTotal, 0);
    return accomplished;
  }
  const name = props.bData[0].Name;
  const [currentUserData, setUserData] = useState(props.bData[0].currentData);
  const [currentTime, setCurrentTime] = useState(moment().format('ddd. MMM. Do YYYY'));
  const [getTotal, setTotal] = useState(getAvg());
  const [newTaskName, setTask] = useState('');
  const [modalDisplay, toggleModal] = useState(false);
  const [number, onChangeNumber] = useState(null);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     setTotal(getAvg());
  //   }, []));



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
        <TextInput style={styles.input1} onChangeText={setTask} value={newTaskName} placeholder="Got more leftovers? Add them here!" />
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 50,
            width: 5,
            height: 5,
            ...styles.shadow
          }}
          onPress={() => toggleModal(true)}
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
            <Text style={{ fontWeight: 'bold' }}>{currentTime}</Text>
          </Text>
        </View>
        <View>
          {currentUserData.map((leftover, index) => <ScheduleContainer leftover={leftover} key={index} index={index} length={currentUserData.length} total={getTotal} setTotal={setTotal} />)}
        </View>
        <View style={{ paddingTop: 20, flexDirection: 'row', zIndex: -1 }} >
          <Image
            source={require('../images/carrotForkRepeat.gif')}
            resizeMode='contain'
            style={{
              width: 130,
              height: 130,
              zIndex: 100,
            }}
          />

          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <View style={{
              borderRadius: 10,
              width: 200,
              padding: 10,
              borderWidth: 2,
              fontSize: 14,
            }}>
              <Text style={{ textAlign: 'center' }}>
                <Text>You earned </Text>
                <Text style={{ fontWeight: 'bold' }}>{getAvg()} oz.</Text>
                <Text> this week towards your next status 🥳</Text>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <Modal visible={modalDisplay} animationType="slide">
        <View style={{ marginHorizontal: 30 }} >
          <View style={{ marginTop: 30 }}>
            <Text style={{
              color: 'darkgreen',
              fontSize: 24,
              marginTop: 30,
              marginLeft: 30,
              fontWeight: 'bold',
              textAlign: 'center'
            }}>
              <Text>New Leftover Task</Text>
            </Text>
            <Text style={{ color: 'darkgreen', fontSize: 16, paddingTop: 10 }}>
              Tell us more about it:
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 10,  justifyContent: 'center' }}>Amount:</Text>
              </View>
              <View style={{width: '50%', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                <TextInput
                  style={styles.input2}
                  onChangeText={onChangeNumber}
                  value={number}
                  placeholder="i.e 4"
                  keyboardType="phone-pad"
                />
                <Text style={{fontSize: 16, paddingTop: 10}}>Oz.</Text>
              </View>
            </View>
          </View>
          <View style={{ marginBottom: 40 }}>
            <Button title="Close" onPress={() => toggleModal(false)} />
          </View>
        </View>
      </Modal>

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
  input2: {
    width: '30%',
    height: 25,
    marginRight: 15,
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 10,
    padding: 5
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
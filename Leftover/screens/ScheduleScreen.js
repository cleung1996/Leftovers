import React, {useState} from 'react';
import {
  View,
  Image,
  Input,
  Text,
  Button,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
  Switch,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import {useFocusEffect} from '@react-navigation/native';
import moment from 'moment';
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from 'react-native-date-picker';

import ScheduleContainer from './components/scheduleContainer';
import NewTaskScheduleContainer from './components/newTaskScheduleContainer';

const ScheduleScreens = props => {
  const getAvg = () => {
    const completedTotal = (previousValue, currentValue) =>
      previousValue + currentValue.Completed;
    const accomplished = currentUserData.reduce(completedTotal, 0);
    return accomplished;
  };

  const getAvgNewTask = () => {
    const completedTotal = (previousValue, currentValue) =>
      previousValue + currentValue.Completed;
    const accomplished = props.bData[0].tasksNextWeek.reduce(completedTotal, 0);
    return accomplished;
  };
  const name = props.bData[0].Name;
  const [currentUserData, setUserData] = useState(props.bData[0].currentData);
  const [currentTime, setCurrentTime] = useState(
    moment().format('ddd. MMM. Do YYYY'),
  );
  const [getTotal, setTotal] = useState(getAvg());
  const [newTaskName, setTask] = useState('');
  const [modalDisplay, toggleModal] = useState(false);
  const [number, onChangeNumber] = useState(null);
  const [address, onChangeAddress] = useState('');
  const [city, onChangeCity] = useState('');
  const [state, onChangeState] = useState('');
  const [zipCode, onChangeZipCode] = useState('');
  const [radius, onChangeRadius] = useState('');
  const [date, setDate] = useState(new Date());
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const [tasksNextWeek, setNewTaskObj] = useState(props.bData[0].tasksNextWeek);
  const [donationsInProgress, setDonationTask] = useState(props.bData[0].donationsOut);
  const [newTaskTotal, setNewTaskTotal] = useState(getAvgNewTask());

  const postNewObj = () => {
    console.log('numberinOz', Number(number));
    console.log('enteredCity', city);
    console.log('state', state);
    console.log('zip', zipCode);
    console.log('isDonating', isEnabled);
    console.log('expiryDate', date);
    console.log('moment', moment(date));

    const newTask = {
      Item: newTaskName,
      Qty: number,
      'Expiry Date': date,
      Completed: 0,
      isDonating: isEnabled,
    };

    const newDonationItem = {
      ...newTask,
      Address: address,
      City: city,
      State: state,
      ZipCode: zipCode,
      maxRadius: radius,
    };

    // console.log('newDonationsItem', newDonationItem);
    // console.log('donationsInProgress', donationsInProgress);

    // let newDonations= newDonationItem + (donationsInProgress);
    // console.log('donationsOut', newDonations);

    props.bData[0].donationsOut = [...donationsInProgress, newDonationItem];
    props.bData[0].tasksNextWeek = [ ...tasksNextWeek, newTask];
    setDonationTask(props.bData[0].donationsOut);
    setNewTaskObj(props.bData[0].tasksNextWeek);

    console.log('donationsOut', props.bData[0].donationsOut);
    console.log('tasksNextWeek', props.bData[0].tasksNextWeek);

    toggleModal(false);
  };

  // useFocusEffect(
  //   React.useCallback(() => {
  //     setTotal(getAvg());
  //   }, []));

  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={{
          color: 'darkgreen',
          fontSize: 28,
          marginTop: 30,
          marginLeft: 30,
          fontWeight: 'bold',
        }}>
        <Text>Your Weekly Schedule</Text>
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 80,
        }}>
        <TextInput
          style={styles.input1}
          onChangeText={setTask}
          value={newTaskName}
          placeholder="Got more leftovers? Add them here!"
        />
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 50,
            width: 5,
            height: 5,
            ...styles.shadow,
          }}
          onPress={() => toggleModal(true)}>
          <FontAwesomeIcon icon={faPlusCircle} size={40} color={'darkgreen'} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView}>
        <View>
          <Text
            style={{
              color: 'darkgreen',
              fontSize: 16,
            }}>
            <Text>Tasks as of today: </Text>
            <Text style={{fontWeight: 'bold'}}>{currentTime}</Text>
          </Text>
        </View>
        <View>
          {currentUserData.map((leftover, index) => (
            <ScheduleContainer
              leftover={leftover}
              key={index}
              index={index}
              length={currentUserData.length}
              total={getTotal}
              setTotal={setTotal}
            />
          ))}
        </View>
        <View style={{paddingTop: 20, flexDirection: 'row', zIndex: -1}}>
          <Image
            source={require('../images/carrotForkRepeat.gif')}
            resizeMode="contain"
            style={{
              width: 130,
              height: 130,
              zIndex: 100,
            }}
          />

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                borderRadius: 10,
                width: 200,
                padding: 10,
                borderWidth: 2,
                fontSize: 14,
              }}>
              <Text style={{textAlign: 'center'}}>
                <Text>You earned </Text>
                <Text style={{fontWeight: 'bold'}}>{getAvg()} oz.</Text>
                <Text> this week towards your next status 🥳</Text>
              </Text>
            </View>
          </View>
        </View>
        <View>
          <Text
            style={{
              color: 'darkgreen',
              fontSize: 16,
              paddingTop: 10,
            }}>
            <Text>Tasks for next week: </Text>
          </Text>
          <Text style={{fontSize: 13, paddingTop: 5, color: 'darkgreen'}}>
            <Text>
              You can start contributing now, but points will only be added and
              affect{' '}
            </Text>
            <Text style={{fontWeight: 'bold'}}>next </Text>
            <Text>week's goal</Text>
          </Text>
        </View>
        <View>
          {props.bData[0].tasksNextWeek.map((leftover, index) => {
            console.log('length', props.bData[0].tasksNextWeek.length);
            console.log('index', index);
            return (
              <NewTaskScheduleContainer
                leftover={leftover}
                key={index}
                index={index}
                length={props.bData[0].tasksNextWeek.length}
                newTaskTotal={newTaskTotal}
                setNewTaskTotal={setNewTaskTotal}
              />
            );
          })}
        </View>
        <View style={{height: 50}} />
      </ScrollView>
      <Modal visible={modalDisplay} animationType="slide">
        <View
          style={{
            marginHorizontal: 50,
            flexDirection: 'column',
            justifyContent: 'center',
            marginTop: 30,
          }}>
          <View style={{marginTop: 30}}>
            <Text
              style={{
                color: 'darkgreen',
                fontSize: 24,
                marginTop: 30,
                marginLeft: 30,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              <Text>New Leftover Task</Text>
            </Text>
            <Text style={{color: 'darkgreen', fontSize: 16, paddingTop: 30}}>
              Tell us more about it:
            </Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 16,
                    marginTop: 10,
                    justifyContent: 'center',
                  }}>
                  Item Name:
                </Text>
              </View>
              <View
                style={{
                  width: '50%',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  paddingBottom: 10,
                }}>
                <Text
                  style={{fontSize: 16, paddingTop: 10, fontWeight: 'bold'}}>
                  {newTaskName}
                </Text>
              </View>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 16,
                    marginTop: 10,
                    justifyContent: 'center',
                  }}>
                  Amount:
                </Text>
              </View>
              <View
                style={{
                  width: '50%',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  paddingBottom: 10,
                }}>
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
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 16,
                    justifyContent: 'center',
                  }}>
                  Wanna donate it?
                </Text>
              </View>
              <View
                style={{
                  width: '50%',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}>
                <Switch
                  trackColor={{false: '#767577', true: '#aece78'}}
                  thumbColor={isEnabled ? '4e622b' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
                <Text style={{fontSize: 16, paddingTop: 10}}>
                  {isEnabled ? '  Yes' : '   No'}
                </Text>
              </View>
            </View>
            {isEnabled && (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: 10,
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 16,
                        justifyContent: 'center',
                      }}>
                      Address:
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: 5,
                  }}>
                  <TextInput
                    style={{...styles.input3, width: '70%'}}
                    onChangeText={onChangeAddress}
                    value={address}
                    placeholder="House Number, Street Name"
                  />
                  <TextInput
                    style={{...styles.input3, width: '30%'}}
                    onChangeText={onChangeCity}
                    value={city}
                    placeholder="City"
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: 5,
                  }}>
                  <TextInput
                    style={{...styles.input3, width: '30%'}}
                    onChangeText={onChangeState}
                    value={state}
                    placeholder="State"
                  />
                  <TextInput
                    style={{...styles.input3, width: '33%'}}
                    onChangeText={onChangeZipCode}
                    value={zipCode}
                    placeholder="Zip Code"
                  />
                  <TextInput
                    style={{...styles.input3, width: '33%'}}
                    onChangeText={onChangeRadius}
                    value={radius}
                    placeholder="Radius (mi.)"
                  />
                </View>
              </>
            )}
            <View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 16,
                    marginTop: 10,
                    justifyContent: 'center',
                  }}>
                  Expiry Date:
                </Text>
              </View>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingBottom: 10,
                }}>
                <DatePicker date={date} onDateChange={setDate} mode="date" />
              </View>
            </View>
          </View>
          <View
            style={{
              marginBottom: 40,
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <Button title="Add Task" onPress={() => postNewObj()} />
            <Button title="Cancel" onPress={() => toggleModal(false)} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
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
    height: 30,
    marginRight: 15,
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
  },
  input3: {
    height: 30,
    marginRight: 15,
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
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
    elevation: 5,
  },
});

{
  /* <Text>Schedule</Text>
<Button title="Click Here" onPress={() => alert('Button Clicked!')} /> */
}

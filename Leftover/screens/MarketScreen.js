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
import MapView, {MarkerAnimated, Marker, Callout} from 'react-native-maps';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import {useFocusEffect} from '@react-navigation/native';
import moment from 'moment';
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from 'react-native-date-picker';

import ScheduleContainer from './components/scheduleContainer';
import NewTaskScheduleContainer from './components/newTaskScheduleContainer';
import incomingData from '../data/data';
import axios from 'axios';
import {google_api_key} from '../config/config.js';

const MarketScreen = props => {
  console.log('from market', props.dData[0]);
  const [newDonationIn, setNewDonation] = useState('');
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
  const [donationsOutCoordinants, setCoordinatesOut] = useState([]);

  const generateData = () => {
    let originLat = props.dData[0].donationsOut[0].lat;
    let originLong = props.dData[0].donationsOut[0].long;

    let final = [];
    let promises = [];

    for (var i = 0; i < incomingData.length; i++) {
      if (incomingData[i].email === props.dData[0].email) continue;

      const donationsOut = incomingData[i].donationsOut;
      for (var j = 0; j < donationsOut.length; j++) {
        let item = {
          item: donationsOut[j].Item,
          qty: donationsOut[j].Qty,
          expiryDate: donationsOut[j]['Expiry Date'],
          lat: donationsOut[j].lat,
          long: donationsOut[j].long,
        };
        final.push(item);
      }
    }

    console.log(final)

    return final;

  }

  useFocusEffect(
    React.useCallback(() => {
      console.log('inside focusEffect');
      console.log('allData', props.dData[0]);
      console.log('donationsOut', props.dData[0].donationsOut);
      console.log('lat', props.dData[0].donationsOut[0].lat);
      console.log('long', props.dData[0].donationsOut[0].long);

      let originLat = props.dData[0].donationsOut[0].lat;
      let originLong = props.dData[0].donationsOut[0].long;

      let final = [];
      let promises = [];

      for (var i = 0; i < incomingData.length; i++) {
        if (incomingData[i].email === props.dData[0].email) continue;
        const donationsOut = incomingData[i].donationsOut;
        const name = incomingData[i].Name;
        for (var j = 0; j < donationsOut.length; j++) {
          let item = {
            item: donationsOut[j].Item,
            qty: donationsOut[j].Qty,
            expiryDate: donationsOut[j]['Expiry Date'],
            lat: donationsOut[j].lat,
            long: donationsOut[j].long,
            user: name,
          };
          final.push(item);
        //   promises.push(
        //     axios
        //       .get(
        //         `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${donationsOut[j].lat}%2C${donationsOut[j].long}&origins=${originLat}%2C${originLong}&key=${google_api_key}`,
        //       )
        //       .then(response => {
        //         const distance = response.data.rows[0].elements[0].distance.value;

        //         let item = {
        //           ...item,
        //           distance: distance
        //         };

        //         console.log(item);
        //       })
        //       .catch(err => console.log(err)),
        //   );
        }
      }

      console.log(final)
      setCoordinatesOut(final);

      console.log(donationsOutCoordinants);

      //   let coordinates = [];
      //   let promises = [];
      //   let anotherPromise = [];
      //   let final = [];
      //   // https://maps.googleapis.com/maps/api/geocode/json?address=${donationsOut[0].Address}+${donationsOut[0].City}+${donationsOut[0].State}&key=${google_api_key}
      //   for (var j = 0; j < incomingData.length; j++) {
      //   if (incomingData[j]['email'] === props.dData[0].email) continue;
      //   const donationsOut = incomingData[j].donationsOut;
      //   for(var i = 0; i < donationsOut.length; i++) {
      //     promises.push(
      //       axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${donationsOut[i].Address}+${donationsOut[i].City}+${donationsOut[i].State}&key=${google_api_key}`)
      //       .then((response) => {
      //         const longLat = response.data.results[0].geometry.location;
      //         coordinates.push(response.data.results[0].geometry.location);
      //       })
      //       .catch((err) => console.log(err))
      //     )
      //   }

      // }

      //   Promise.all(promises).then(() => {
      //     console.log(coordinates);
      //     setCoordinatesOut(coordinates);
      //   });
    }, []),
  );

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
        <Text>Marketplace</Text>
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
          onChangeText={setNewDonation}
          value={newDonationIn}
          placeholder="Need "
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
        <View style={{paddingBottom: 10}}>
          <Text
            style={{
              color: 'darkgreen',
              fontSize: 16,
            }}>
            <Text>I'm </Text>
            <Text style={{fontWeight: 'bold'}}>donating </Text>
            <Text>these items </Text>
          </Text>
          <Text
            style={{
              color: 'darkgreen',
              fontSize: 16,
            }}>
            <Text>I would like </Text>
            <Text style={{fontWeight: 'bold'}}>these items</Text>
          </Text>
        </View>
        <View>
          <View style={styles.containerMap}>
            <MapView
              style={styles.map}
              region={{
                latitude: props.dData[0].donationsOut[0].lat,
                longitude: props.dData[0].donationsOut[0].long,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              }}>
                {donationsOutCoordinants.map((donation, index) => <Marker
                  key={index}
                  coordinate={{
                    latitude: donation.lat,
                    longitude: donation.long
                  }}>
                    <Callout>
                      <Text>Doner: {donation.user}</Text>
                      <Text>Item: {donation.item}</Text>
                      <Text>Amount: {donation.qty} Oz.</Text>
                      <Text>Expires: {donation.expiryDate}</Text>
                      <Button title="Claim"  onPress={() => alert('Claimed!')}/>
                    </Callout>
                  </Marker>
                )}
                <Marker coordinate={{
                  latitude: props.dData[0].donationsOut[0].lat,
                  longitude: props.dData[0].donationsOut[0].long
                }}
                pinColor='darkgreen'
                >
                  <Callout>
                    <Text>You</Text>
                  </Callout>

                </Marker>
              </MapView>
          </View>
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
                  {newDonationIn}
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

export default MarketScreen;

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
  containerMap: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

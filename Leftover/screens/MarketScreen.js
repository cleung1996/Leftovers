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

import DonationOut from './components/donationOutContainer';
import DonationIn from './components/donationInContainer';

import incomingData from '../data/data';
import axios from 'axios';
import {google_api_key} from '../config/config.js';

const MarketScreen = props => {
  console.log('from market', props.dData[0]);
  const [newDonationIn, setNewDonation] = useState('');
  const [modalDisplay, toggleModal] = useState(false);
  const [number, onChangeNumber] = useState(null);
  // const [address, onChangeAddress] = useState('');
  // const [city, onChangeCity] = useState('');
  // const [state, onChangeState] = useState('');
  // const [zipCode, onChangeZipCode] = useState('');
  // const [radius, onChangeRadius] = useState('');
  const [date, setDate] = useState(new Date());
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [donationsOutCoordinants, setCoordinatesOut] = useState([]);
  const [myDonations, setMyDonations] = useState(props.dData[0].donationsOut);
  const [myNeeds, setMyNeeds] = useState(props.dData[0].donationsIn);

  useFocusEffect(
    React.useCallback(() => {
      console.log('inside focusEffect');
      console.log('allData', props.dData[0]);
      console.log('donationsOut', props.dData[0].donationsOut);
      console.log('donationsIn', props.dData[0].donationsIn);

      let originLat = props.dData[0].donationsOut[0].lat;
      let originLong = props.dData[0].donationsOut[0].long;

      let final = [];
      let promises = [];

      for (var i = 0; i < incomingData.length; i++) {
        if (incomingData[i].email === props.dData[0].email) continue;
        const donationsOut = incomingData[i].donationsOut;
        const name = incomingData[i].Name;
        for (var j = 0; j < donationsOut.length; j++) {
          let responseObj = {
            item: donationsOut[j].Item,
            qty: donationsOut[j].Qty,
            expiryDate: donationsOut[j]['Expiry Date'],
            lat: donationsOut[j].lat,
            long: donationsOut[j].long,
            user: name,
          };

          promises.push(
            axios
              .get(
                `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${donationsOut[j].lat}%2C${donationsOut[j].long}&origins=${originLat}%2C${originLong}&key=${google_api_key}`,
              )
              .then(response => {
                const distance =
                  response.data.rows[0].elements[0].distance.value;
                const responseObjDistance = {
                  ...responseObj,
                  distance,
                };
                //   return axios.get(url2).then( newRespnose => {

                //     const xys = {
                //       ...responseObjDistance,
                //       new : new,
                //     }
                //       return xys
                //   })

                //  return add(5, 5)

                return responseObjDistance; //wrapped in a promise bc its within then block
              })
              .catch(err => console.log(err)),
          );
        }
      }

      Promise.all(promises).then(data => {
        setCoordinatesOut(data);
      });
    }, []),
  );

  const postNewObj = () => {
    console.log('numberinOz', Number(number));
    console.log('Days Needed', moment(date).format('YYYY-MM-DD'));
    console.log('moment', moment(date));

    const newItem = {
      Item: newDonationIn,
      Qty: number,
      'Days Needed': moment(date).format('YYYY-MM-DD')
    };
    props.dData[0].donationsIn = [newItem, ...props.dData[0].donationsIn];
    setMyNeeds(props.dData[0].donationsIn);
    toggleModal(false);
  };

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
          placeholder="Need something? Add here"
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
          <View>
            {props.dData[0].donationsOut.map((donation) => <DonationOut leftover={donation} />)}
          </View>
          <Text
            style={{
              color: 'darkgreen',
              fontSize: 16,
              paddingTop: 10
            }}>
            <Text>I would like </Text>
            <Text style={{fontWeight: 'bold'}}>these items</Text>
          </Text>
          <View>
            {props.dData[0].donationsIn.map((need) => <DonationIn leftover={need} />)}
          </View>
        </View>
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
           {/*  <View
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
            )} */}
            <View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 16,
                    marginTop: 10,
                    justifyContent: 'center',
                  }}>
                  When do you need it by?
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
      </ScrollView>
          <View style={styles.containerMap}>
            <MapView
              style={styles.map}
              region={{
                latitude: props.dData[0].donationsOut[0].lat,
                longitude: props.dData[0].donationsOut[0].long,
                latitudeDelta: 0.02,
                longitudeDelta: 0.02,
              }}>
              {donationsOutCoordinants.map((donation, index) => (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: donation.lat,
                    longitude: donation.long,
                  }}>
                  <Callout>
                    <Text>Doner: {donation.user}</Text>
                    <Text>Item: {donation.item}</Text>
                    <Text>Amount: {donation.qty} Oz.</Text>
                    <Text>Expires: {donation.expiryDate}</Text>
                    <Text style={{fontWeight: 'bold'}}>
                      {Math.round(donation.distance * 0.000621371 * 100) / 100}{' '}
                      mi. away
                    </Text>
                    <Button title="Claim" onPress={() => alert('Claimed!')} />
                  </Callout>
                </Marker>
              ))}
              <Marker
                coordinate={{
                  latitude: props.dData[0].lat,
                  longitude: props.dData[0].long,
                }}
                pinColor="darkgreen">
                <Callout>
                  <Text>You</Text>
                </Callout>
              </Marker>
            </MapView>
          </View>
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
    marginBottom: 10,
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
    marginLeft: 30,
    marginRight: 30,
    height: 270,
    marginBottom: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 15,
  },
});

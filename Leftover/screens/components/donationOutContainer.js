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
import moment from 'moment';
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from 'react-native-date-picker';
import {useFocusEffect} from '@react-navigation/native';

const DonationOut = ({ leftover }) => {
  const [expDate, setExpiryDate] = useState(0);


  useFocusEffect(
    React.useCallback(() => {
      let now = moment(new Date());
      let end = moment(leftover['Expiry Date']);
      let duration = moment.duration(now.diff(end));
      setExpiryDate(Math.ceil( -1 * duration.asDays()));
    }, []));


  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, borderWidth: 1, marginTop: 10, borderRadius: 10}}>
      <View>
        <Text style={{fontWeight: 'bold'}}>{leftover.Item}</Text>
        <Text>Amount: {leftover.Qty} oz.</Text>
      </View>
      <View>
        <Text style={{fontWeight: expDate <= 3 ? 'bold' : 'normal', color: expDate <= 3 ? 'darkred' : 'black'}} >Expires in {expDate} days</Text>
      </View>
    </View>

    )


}

export default DonationOut;


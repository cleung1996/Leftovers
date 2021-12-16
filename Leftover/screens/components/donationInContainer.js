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

const DonationIn = ({ leftover }) => {
  const [needDate, setNeedDate] = useState(0);


  useFocusEffect(
    React.useCallback(() => {
      let now = moment(new Date());
      let end = moment(leftover['Days Needed']);
      let duration = moment.duration(now.diff(end));
      setNeedDate(Math.ceil( -1 * duration.asDays()));
    }, []));


  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, borderWidth: 1, marginTop: 10, borderRadius: 10}}>
      <View>
        <Text style={{fontWeight: 'bold'}}>{leftover.Item}</Text>
        <Text>Amount: {leftover.Qty} oz.</Text>
      </View>
      <View>
        <Text style={{fontWeight: needDate <= 3 ? 'bold' : 'normal', color: needDate <= 3 ? 'darkred' : 'black'}} >Need within {needDate} days</Text>
      </View>
    </View>

    )

}

export default DonationIn;


import React, { useRef, useEffect, useState } from 'react';
import { Animated, Modal, StyleSheet, Button, TextInput, SafeAreaView, CroppingView, View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import CircularProgress from 'react-native-circular-progress-indicator';
import { useFocusEffect } from '@react-navigation/native';
import { CountUp } from 'use-count-up';
import DropDownPicker from 'react-native-dropdown-picker';
import moment from 'moment';

const NewTaskScheduleContainer = ({ leftover, index, length, newTaskTotal, setNewTaskTotal }) => {
  const [percentageChange, onChangePercentage] = useState((leftover.Completed) / leftover.Qty * 100);
  const [counter, onChangeCount] = useState(leftover.Completed);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [items, setItems] = useState([...Array(leftover.Qty - leftover.Completed)].map((_, i) => ({ 'label': `${i + 1} oz.`, 'value': `${i + 1}`, })));
  const [zIdx, setzIdx] = useState(Number(index - length));
  const [expDate, setExpiryDate] = useState(0);
  const [leftoverItem, setleftoverItem] = useState(leftover);

  const changeContribution = () => {
    leftover.Completed = leftover.Completed + Number(value);
    onChangePercentage(leftover.Completed / leftover.Qty * 100);
    onChangeCount(leftover.Completed);
    setItems([...Array(leftover.Qty - leftover.Completed)].map((_, i) => ({ 'label': `${i + 1} oz.`, 'value': `${i + 1}`, })));
    setNewTaskTotal(newTaskTotal + Number(value));
  }

  useFocusEffect(
    React.useCallback(() => {
      onChangePercentage((leftoverItem.Completed) / leftoverItem.Qty * 100);
      onChangeCount(leftoverItem.Completed);
      let now = moment(new Date());
      let end = moment(leftover['Expiry Date']);
      console.log('enddate', end);
      console.log('newTaskTotal', newTaskTotal);
      console.log('percentageChange', percentageChange);
      console.log('counter', counter);

      console.log('leftOverQTY', leftover.Qty);
      console.log('leftoverTotal', leftover.Completed);

      let duration = moment.duration(now.diff(end));
      setExpiryDate(Math.ceil( -1 * duration.asDays()));
    }, [percentageChange, counter]));

    console.log('leftoverQty', leftover.Item, leftover.Qty);
    console.log('leftoverCompleted', leftover.Item, leftover.Completed);

  return (
    <View style={{ paddingTop: 15, zIndex: zIdx }}>
      <View style={{ width: '100%', height: 125, borderRadius: 10, borderWidth: 1, flexDirection: 'row', justifyContent: 'space-between', shadowColor: '#7F5DF0',  }}>
        <View style={{ flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', padding: 15 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
            {leftover.Item} - {leftover.Qty} oz.
          </Text>
          <Text>Donation in progress: {leftover.isDonating ? 'Yes' : 'No'}</Text>
          {Number(leftover.Qty) === Number(leftover.Completed)
          ? <Text style={{fontWeight: 'bold'}}>Task Complete 🎉</Text>
          : <Text style={{fontWeight: expDate <= 3 ? 'bold' : 'normal', color: expDate <= 3 ? 'darkred' : 'black'}} >
            Expires in{' '}
            {expDate}
            {' '}
            days
          </Text>}
          {leftover.Qty !== leftover.Completed
          ? (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'space-between' }}>
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                placeholder="Reduce:"
                translation={{
                  NOTHING_TO_SHOW: "Completed"
                }}
                listMode="SCROLLVIEW"
                style={{width: 100, height: 23, paddingRight: 10 }}
                zIndex={10000}
                containerStyle={{width: 100}}
                textStyle={{
                  fontSize: 12,
                  backgroundColor: 'white',
                  zIndex: 5000
                }}
                labelStyle={{
                  fontWeight: 'bold'
                }}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
              />
              <TouchableOpacity style={{...styles.shadow}} onPress={() => changeContribution()}>
                <View style={{  borderWidth: 1, borderRadius: 10, width: 80, left: 5, padding: 3,  flexDirection: 'row', justifyContent: 'center'}}>
                  <Text style={{ fontWeight: 'bold', fontSize: 12, color: 'darkgreen' }}>Contribute</Text>
                </View>
              </TouchableOpacity>
          </View>
          )
          :(
            <View style={{ flexDirection: 'row', width: 180, justifyContent: 'space-between', alignItems: 'space-between' }}>
            </View>
          )}
        </View>
        <View style={{ flexDirection: 'column', justifyContent: 'center', padding: 15 }}>
          <AnimatedCircularProgress
            size={100}
            width={15}
            duration={2000}
            fill={percentageChange}
            tintColor={(percentageChange) >= 50 ? "darkgreen" : "darkred"}
            backgroundColor={(percentageChange) >= 50 ? "#aece78" : "#ec884e"}>
          </AnimatedCircularProgress>
          <View style={{position: 'absolute', width: 70, alignItems: 'center', left: 31}}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }} >
              <CountUp isCounting end={counter} duration={2} /> oz.
            </Text>
          </View>
        </View>
      </View>
    </View >
  )

}

export default NewTaskScheduleContainer;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
  }
});

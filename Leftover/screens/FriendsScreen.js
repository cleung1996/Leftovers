import React, { useState } from 'react';
import { View, Image, Text, Button, StyleSheet, StatusBar, SafeAreaView, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment';
import { CountUp } from 'use-count-up';


import masterData from '../data/data.js';
import FriendContainer from './components/friendContainer.js';

const FriendsScreen = (props) => {
  console.log('hi from friends', props.cData[0]);
  let data = props.cData[0];
  const [name, setName] = useState(data.Name);
  const [friends, setFriends] = useState(data.friends);
  const [currentData, setCurrentData] = useState(data.currentData);
  const [points, setPoints] = useState(data.points);
  const [currentStatus, setStatus] = useState(data.status);
  const [value, setValue] = useState(0);
  const [nextLevel, setNextLevel] = useState('something');
  const [valueOld, setValueOld] = useState(0);
  const [pointsOld, setPointsOld] = useState(0);
  const [oldAccomplished, setOldAccomplished] = useState(0);
  const [sortedList, sortList] = useState(masterData);


  let status = [
    { 'status': 'Bronze', 'points': 1000 },
    { 'status': 'Silver', 'points': 2000 },
    { 'status': 'Gold', 'points': 3000 },
    { 'status': 'Platinum', 'points': 4000 },
    { 'status': 'Diamond', 'points': 5000 },
  ];

  const rankFriendsList = () => {

    let response = [];

    for (let i = 0; i < masterData.length; i++) {
      const currentValue = masterData[i];
      if (!friends.includes(currentValue.id)) continue;

      const completedTotal = (previousValue, currentValue) => previousValue + currentValue.Completed;
      const trueTotal = (previousValue, currentValue) => previousValue + currentValue.Qty;
      const accomplished = currentValue.currentData.reduce(completedTotal, 0);
      const total = currentValue.currentData.reduce(trueTotal, 0);
      const newValue = Math.floor(accomplished / total * 100);

      let responseObj = {
        'name': currentValue.Name,
        'points': currentValue.points,
        'weeklyScore': newValue,
        'isUser': false,
        'status': currentValue.status,
        'id': currentValue.id,
      }
      response.push(responseObj);
    }

    response.push({
      'name': name,
      'points': points,
      'weeklyScore': value,
      'isUser': true,
      'status': currentStatus,
      'id': data.id,
    })
    response.sort((a,b) => b.weeklyScore - a.weeklyScore);
    response.forEach((a, index) => a.rank = index + 1);
    console.log(response);
    return response;
  }

  useFocusEffect(
    React.useCallback(() => {
      let results = status.filter((aStatusLevel) => aStatusLevel.status === currentStatus);
      let index = status.findIndex((aStatusLevel) => aStatusLevel.status === currentStatus);
      const completedTotal = (previousValue, currentValue) => previousValue + currentValue.Completed;
      const trueTotal = (previousValue, currentValue) => previousValue + currentValue.Qty;
      const accomplished = currentData.reduce(completedTotal, 0);
      const total = currentData.reduce(trueTotal, 0);
      const newValue = Math.floor(accomplished / total * 100);
      const newStatus = results[0].status;
      const amountGained = accomplished - oldAccomplished;

      if (amountGained > 0) {
        setPointsOld(newValue);
        setPoints(points + amountGained)
        setOldAccomplished(accomplished);
      }
      setValue(newValue);
      setStatus(newStatus);
      rankFriendsList();


      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions

      };
    }, [value, nextLevel, currentStatus])
  );

  const determineRank = () => {
    let user = sortedList.filter((aFriend) => aFriend['isUser'] === true)
    console.log(user);

    return
  }

  return (
    <SafeAreaView style={styles.container} >
      <Text style={{
        color: 'darkgreen',
        fontSize: 28,
        marginTop: 30,
        marginLeft: 30,
        fontWeight: 'bold'
      }}>
        <Text>Battleground</Text>
      </Text>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 80,
      }}>
        <TextInput style={styles.input1} placeholder="Add Friends (ie friend@gmail.com)" />
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 50,
            width: 5,
            height: 5,
            ...styles.shadow
          }}
          onPress={() => alert('Friend Added')}
        >
          <FontAwesomeIcon icon={faUsers} size={40} color={'darkgreen'} />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', zIndex: -1, marginRight: 30, marginLeft: -10, marginTop: -15 }} >
        <Image
          source={require('../images/carrotStrong.gif')}
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
          justifyContent: 'center',
        }}>
          <View style={{
            borderRadius: 10,
            width: 250,
            padding: 10,
            borderWidth: 2,
            fontSize: 14,
          }}>
            <Text style={{ textAlign: 'center' }}>
              <Text>Your weekly score: </Text>
              <Text style={{ fontWeight: 'bold' }}>
                <CountUp isCounting end={value} duration={2} />%
              </Text>
            </Text>
            <Text style={{ textAlign: 'center' }}>
              <Text>Your overall score: </Text>
              <Text style={{ fontWeight: 'bold' }}>
                <CountUp isCounting end={points} duration={2} /> oz.
              </Text>
            </Text>
            <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Rank: {
              rankFriendsList().filter((aFriend) => aFriend['isUser'] === true)[0].rank
            }</Text>
          </View>
        </View>
      </View>
      <ScrollView style={styles.scrollView} >
        <View >
          <Text style={{
            color: 'darkgreen',
            fontSize: 18,
          }}>
            <Text>Here's what your friends are up to: </Text>
          </Text>
        </View>
        <View style={{marginTop: 10}}>
          <View>
            {rankFriendsList().map((aFriend) => <FriendContainer aFriend={aFriend} key={aFriend.id} />)}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView >

  );
};

export default FriendsScreen;

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
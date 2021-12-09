import React, { useRef, useEffect, useState } from 'react';
import { Animated, Modal, StyleSheet, Button, TextInput, SafeAreaView, CroppingView, View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import CircularProgress from 'react-native-circular-progress-indicator';
import { useFocusEffect } from '@react-navigation/native';
import { CountUp } from 'use-count-up';

const returnEmoji = (rank) => {
  if(rank === 1) {
    return '🥇';
  } else if (rank === 2) {
    return '🥈';
  } else if (rank === 3) {
    return '🥉';
  }
}

const imageReturner = (id, isUser) => {
  // if(isUser) {
  //   return '../../images/Mii-boy.png';
  // } else {
  //   if (id % 2 === 0) {
  //     return '../../images/Mii-girl.png';
  //   } else {
  //     return '../../images/Mii-man.png';
  //   }
  // }
  return '../images/Mii-man.png';
}

const FriendContainer = ({aFriend}) => {
  console.log('aFriend', aFriend);
  let random = 'https://randomuser.me/api/portraits/men/1.jpg';

  return (
    <View style={{paddingTop: 20, flexDirection: 'row'}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%', padding: 10, borderRadius: 15, backgroundColor: aFriend.isUser ? '#F6FADE' : '#fff'}}>
        <View style={{flexDirection: 'column', justifyContent: 'center'}}>
          <Image source={{uri: imageReturner(aFriend.id, aFriend.isUser)}} style={styles.img} />
          <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold', paddingTop: 10 }}>{returnEmoji(aFriend.rank) + aFriend.name}</Text>
        </View>
        <View>
        <View style={styles.circleBar}>
          <AnimatedCircularProgress
            size={100}
            width={15}
            duration={2000}
            fill={aFriend.weeklyScore}
            tintColor="darkgreen"
            backgroundColor="#aece78">
          </AnimatedCircularProgress>


          <AnimatedCircularProgress
            size={60}
            width={15}
            style={{
              position: 'absolute'
            }}
            duration={2000}
            fill={(aFriend.points / (Math.ceil(aFriend.points/1000) * 1000))* 100}
            tintColor="#d34d13"
            backgroundColor="#ec884e">
          </AnimatedCircularProgress>
          </View>
          <View>
            <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', paddingTop: 10, color: '#ec884e'}} >
              <CountUp isCounting end={aFriend.points} duration={2} /> oz.
            </Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', color: 'darkgreen'}} >
              <CountUp isCounting end={aFriend.weeklyScore} duration={2} />%
            </Text>
          </View>
        </View>
      </View>
    </View>
  )

}

export default FriendContainer;

const styles = StyleSheet.create({
  img: {
    width: 100,
    height: 100,
    borderRadius: 50,
    paddingTop: 30,
    paddingBottom: 30
  },
  circleBar: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }


})
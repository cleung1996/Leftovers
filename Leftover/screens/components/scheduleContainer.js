import React, { useRef, useEffect, useState } from 'react';
import { Animated, Modal, StyleSheet, Button, TextInput, SafeAreaView, CroppingView, View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import CircularProgress from 'react-native-circular-progress-indicator';
import { useFocusEffect } from '@react-navigation/native';
import { CountUp } from 'use-count-up';

const ScheduleContainer = ({ leftover }) => {
  const [percentageChange, onChangePercentage] = useState((leftover.Completed) / leftover.Qty * 100);
  const [counter, onChangeCount] = useState(leftover.Completed);

  const changeContribution = () => {
    leftover.Completed = 20;
    onChangePercentage(leftover.Completed / leftover.Qty * 100);
    onChangeCount(leftover.Completed);

  }

  useFocusEffect(
    React.useCallback(() => {
      onChangePercentage((leftover.Completed) / leftover.Qty * 100);
      onChangeCount(leftover.Completed);
    }, [percentageChange, counter]));

  return (
    <View style={{ paddingTop: 20 }}>
      <View style={{ width: '100%', height: 125, borderRadius: 10, borderWidth: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', padding: 15 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
            {leftover.Item}
          </Text>
          <Text>Donation in progress: {leftover.isDonating ? 'Yes' : 'No'}</Text>
          <Text>
            Expires: {' '}
            {leftover['Expiry Date']}
          </Text>
          <TouchableOpacity onPress={() => changeContribution()}>
            <View style={{ borderWidth: 1, borderRadius: 10, width: 100, flexDirection: 'row', justifyContent: 'center' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 14, color: 'darkgreen' }}>Contribute</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'column', justifyContent: 'center', padding: 15 }}>
          <AnimatedCircularProgress
            size={100}
            width={15}
            duration={2000}
            fill={percentageChange}
            tintColor={"darkgreen"}
            backgroundColor="#aece78">
          </AnimatedCircularProgress>
          <Text style={{ fontSize: 18, fontWeight: 'bold', position: 'absolute', left: 42 }} >
            <CountUp isCounting end={counter} duration={2} /> oz.
          </Text>
          {/* <CircularProgress
          value={(leftover.Completed)}
          activeStrokeColor={'#ff9102'}
          activeStrokeSecondaryColor={'#aece78'}
          valueSuffix={'oz.'}
          title={`Reduced`}
          titleColor={'darkgreen'}
          titleFontSize={14}
          maxValue={leftover.Qty}
          radius={60}
        /> */}
        </View>
      </View>
    </View >
  )

}

export default ScheduleContainer;
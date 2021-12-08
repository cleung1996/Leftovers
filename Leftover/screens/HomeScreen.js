import React, { useState, useEffect, useRef } from 'react';
import { Animated, View, Text, Image, StyleSheet, SafeAreaView, ScrollView, StatusBar, Button } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useIsFocused } from "@react-navigation/native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMedal, faBullseye, faChartBar } from '@fortawesome/free-solid-svg-icons';
import { CircularProgressWithChild } from 'react-native-circular-progress-indicator';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import CircularProgress from 'react-native-circular-progress-indicator';
import { CountUp } from 'use-count-up'
import TypeWriter from 'react-native-typewriter'


const HomeScreen = ({ navigation, route }) => {
  console.log(route);
  let status = [
    { 'status': 'Bronze', 'points': 1000 },
    { 'status': 'Silver', 'points': 2000 },
    { 'status': 'Gold', 'points': 3000 },
    { 'status': 'Platinum', 'points': 4000 },
    { 'status': 'Diamond', 'points': 5000 },
  ]
  const aFunction = () => {
    let results = status.filter((aStatusLevel) => aStatusLevel.status === currentStatus);
    let index = status.findIndex((aStatusLevel) => aStatusLevel.status === currentStatus);
    const completedTotal = (previousValue, currentValue) => previousValue + currentValue.Completed;
    const trueTotal = (previousValue, currentValue) => previousValue + currentValue.Qty;

    const accomplished = currentData.reduce(completedTotal, 0);
    const total = currentData.reduce(trueTotal, 0);
    return Math.floor(accomplished / total * 100);
  }

  const isFocused = useIsFocused();
  let data = route.params.data[0];
  const [something, setSomething] = useState(0);
  const [name, setName] = useState(data.Name);
  const [email, setEmail] = useState(data.email);
  const [friends, setFriends] = useState(data.friends);
  const [currentData, setCurrentData] = useState(data.currentData);
  const [points, setPoints] = useState(data.points);
  const [currentStatus, setStatus] = useState(data.status);
  const [value, setValue] = useState(0);
  const [nextLevel, setNextLevel] = useState('something');
  const [valueOld, setValueOld] = useState(0);

  // useEffect(() => {
  //   console.log("calledd");

  //   // Call only when screen open or when back on screen
  //   if (isFocused) {
  //     getInitialData();
  //   }
  // }, [points, value, nextLevel, currentStatus]);

  // const getInitialData = async () => {
  //   let results = status.filter((aStatusLevel) => aStatusLevel.status === currentStatus);
  //   let index = status.findIndex((aStatusLevel) => aStatusLevel.status === currentStatus);
  //   const completedTotal = (previousValue, currentValue) => previousValue + currentValue.Completed;
  //   const trueTotal = (previousValue, currentValue) => previousValue + currentValue.Qty;

  //   const accomplished = currentData.reduce(completedTotal, 0);
  //   const total = currentData.reduce(trueTotal, 0);
  //   setValue(Math.floor(accomplished / total * 100));
  //   console.log(value);
  //   setStatus(results[0].status);


  //   if (nextLevel !== 'something' && status[index + 1].status !== nextLevel) {
  //     alert('Woah! New level achieved! Congrats');
  //   }
  //   setNextLevel(status[index + 1].status);
  // }

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
      setStatus(newStatus);
      setValue(newValue);
      if (nextLevel !== 'something' && status[index + 1].status !== nextLevel) {
        alert('Woah! New level achieved! Congrats');
      }
      const newNextLevel = status[index + 1].status;
      setNextLevel(newNextLevel);
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions

      };
    }, [value, nextLevel, currentStatus])
  );



  const props = {
    activeStrokeWidth: 25,
    inActiveStrokeWidth: 25,
    inActiveStrokeOpacity: 0.2
  };

  const FadeInView = (props) => {
    const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0

    React.useEffect(() => {
      let delayTime = 2250;
      let animationTime = 1000;
      if (value === valueOld) {
        delayTime = 0;
        animationTime = 0;
      }
      Animated.sequence([
        Animated.timing(
          fadeAnim,
          {
            toValue: 1,
            duration: animationTime,
            delay: delayTime,
            useNativeDriver: true,
          }
        )
      ]).start(() => setValueOld(value));
    }, [fadeAnim]);

    return (
      <Animated.View                 // Special animatable View
        style={{
          ...props.style,
          opacity: fadeAnim,         // Bind opacity to animated value
        }}
      >
        {props.children}
      </Animated.View>
    );

  }

  const carrotAnnouncement = () => {
    if (value >= 70 && value < 90) {
      return (
        <>
          <Image
            source={require('../images/carrotStrong.gif')}

            resizeMode='contain'
            style={{
              width: 125,
              height: 125,
              zIndex: 100,
            }}
          />
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Text style={{
              borderRadius: 10,
              textAlign: 'center',
              padding: 10,
              width: 200,
              borderWidth: 2,
              fontSize: 14,
            }}>
              <Text>You're almost there, </Text>
              <Text style={{ fontWeight: 'bold' }}>{name}</Text>
              <Text>!</Text>
            </Text>
          </View>
        </>
      );
    } else if (value >= 40 && value < 70) {
      return (
        <>
          <Image
            source={require('../images/carrotStrong.gif')}
            resizeMode='contain'
            style={{
              width: 125,
              height: 125,
              zIndex: 100,
            }}
          />
          <View style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Text style={{
              borderRadius: 10,
              textAlign: 'center',
              padding: 10,
              width: 200,
              borderWidth: 2,
              fontSize: 14,
            }}>
              <Text>Keep going </Text>
              <Text style={{ fontWeight: 'bold' }}>{name}</Text>
              <Text>, I know you can do it!</Text>
            </Text>
          </View>
        </>
      );
    } else if (value < 40) {
      return (
        <>
          <Image
            source={require('../images/carrotSick.gif')}
            resizeMode='contain'
            style={{
              width: 125,
              height: 125,
              zIndex: 100,
            }}
          />

          <View style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Text style={{
              borderRadius: 10,
              width: 200,
              textAlign: 'center',
              padding: 10,
              borderWidth: 2,
              fontSize: 14,
            }}>
              <Text style={{ fontWeight: 'bold' }}>{name}</Text>
              <Text>, don't let me down!</Text>
            </Text>
          </View>
        </>
      );
    } else {
      return (
        <>
          <Image
            source={require('../images/carrotHappy.gif')}
            resizeMode='contain'
            style={{
              width: 125,
              height: 125,
              zIndex: 100,
            }}
          />
          <View style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Text style={{
              borderRadius: 10,
              textAlign: 'center',
              width: 200,
              padding: 10,
              borderWidth: 2,
              fontSize: 14,
            }}>
              <Text>You did it, </Text>
              <Text style={{ fontWeight: 'bold' }}>{name}</Text>
              <Text>!</Text>
            </Text>
          </View>
        </>
      )
    }
  }

  return (
    <SafeAreaView style={styles.container} >
      <ScrollView style={styles.scrollView} >
        <Text style={{
          color: 'darkgreen',
          fontSize: 28,
          marginTop: 30
        }}>
          <Text>Welcome back, </Text>
          <Text style={{ fontWeight: 'bold' }}>{name}</Text>
        </Text>
        <Text style={styles.textCatchup}>
          <Text>Here's where we're at this week: </Text>
        </Text>

        <View style={styles.circleBar}>
          <AnimatedCircularProgress
            size={275}
            style={{ paddingTop: 25 }}
            width={30}
            duration={2000}
            fill={value}
            tintColor="darkgreen"
            backgroundColor="#aece78">
          </AnimatedCircularProgress>

          <Text style={{ fontSize: 26, fontWeight: 'bold', position: 'absolute' }} >
            <CountUp isCounting end={points} duration={2} /> oz.
          </Text>
          <AnimatedCircularProgress
            size={200}
            width={30}
            duration={2000}
            style={{ position: 'absolute' }}
            fill={points / 4000 * 100}
            tintColor="#d34d13"
            backgroundColor="#ec884e">
          </AnimatedCircularProgress>
          <View style={{
            paddingTop: 55
          }}>

          </View>
          {/* <CircularProgressWithChild
            activeStrokeWidth={25}
            inActiveStrokeWidth={25}
            inActiveStrokeOpacity={0.2}
            value={value}
            maxValue={100}
            radius={125}
            activeStrokeColor={'#e84118'}
            inActiveStrokeColor={'#e84118'}
            duration={2000}
          >
            <CircularProgressWithChild
              {...props}
              value={points}
              radius={100}
              fontSize={20}
              maxValue={4000}
              textColor='#222'
              valueSuffix={'%'}
              activeStrokeColor={'#badc58'}
              inActiveStrokeColor={'#badc58'}
              duration={2000}
            >
            </CircularProgressWithChild>
          </CircularProgressWithChild> */}
        </View>
        <View style={{
          flex: 1,
          alignItems: 'flex-start',
          paddingLeft: 45,
          position: 'relative',
          top: -40
        }}>
          <View style={{
            borderLeftWidth: 4,
            height: 110,
            position: 'absolute',
            left: 45,
            bottom: 55
          }}></View>
          <Text style={{ fontSize: 26, fontWeight: 'bold' }}>
            <CountUp isCounting end={value} duration={2} />%
          </Text>
          <Text style={{ fontSize: 16 }}>
            waste reduced
          </Text>
        </View>
        <View style={{
          alignItems: 'flex-end',
          paddingRight: 80,
          position: 'relative',
          top: -20
        }}>
          <View style={{
            borderLeftWidth: 4,
            height: 190,
            position: 'absolute',
            right: 85,
            bottom: 65
          }}></View>
          <Text style={{ fontSize: 26, fontWeight: 'bold' }} >
            <CountUp isCounting end={4000 - points} duration={2} /> oz.
          </Text>
          <Text style={{ fontSize: 16 }}>
            to {nextLevel} status
          </Text>
          <Text>
          </Text>
        </View>

        <View>
          <FadeInView style={{
            top: -30,
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around'
          }}>
            {carrotAnnouncement()}
          </FadeInView>
        </View>

        <View style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Text style={{
            color: 'darkgreen',
            fontSize: 20,
            flex: 1,
            marginTop: 20,
            marginBottom: 10,
            alignItems: 'flex-start',
            justifyContent: 'flex-start'
          }}>Cumulative stats to date</Text>
          <Image source={require('../images/Mii-boy.png')} style={styles.img} />
          <Text style={{
            color: 'darkgreen',
            fontSize: 20,
            fontWeight: 'bold',
            flex: 1,
            marginTop: 20,
            marginBottom: 10,
            alignItems: 'flex-start',
            justifyContent: 'flex-start'
          }}>{data.Name}</Text>
        </View>
        <View style={{
          marginBottom: 15,
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around'
        }}>

          <FontAwesomeIcon icon={faMedal} size={30} color={'darkgreen'} />
          <Text style={{ fontSize: 16, width: 100 }}>{currentStatus} </Text>
        </View>

        <View style={{
          marginBottom: 15,
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around'
        }}>

          <FontAwesomeIcon icon={faBullseye} size={30} color={'darkgreen'} />
          <Text style={{ fontSize: 16, width: 100 }}>Composting Connoiseur</Text>
        </View>


        <View style={{
          marginBottom: 15,
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around'
        }}>

          <FontAwesomeIcon icon={faChartBar} size={30} color={'darkgreen'} />
          <Text style={{ fontSize: 16, width: 100 }}>#682 appwide</Text>
        </View>
        <View style={{
          height: 20
        }}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#fff',
  },
  scrollView: {
    backgroundColor: '#fff',
    marginHorizontal: 30,
    marginBottom: 85
  },
  text: {
    color: 'darkgreen',
    fontSize: 28,
  },
  textCatchup: {
    color: 'darkgreen',
    fontSize: 18,
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 50,
    paddingTop: 30,
    paddingBottom: 30
  },
  circleBar: {
    flex: 1,
    paddingTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  }

})

/*
<View style={styles.container}>
<Text style={styles.text}>Hello World</Text>
<Image source={{uri: 'https://randomuser.me/api/portraits/men/1.jpg'}} style={styles.img} />
<FontAwesomeIcon icon={ faCoffee } />
</View>


<CircularProgress
radius={90}
value={85}
textColor='#222'
fontSize={20}
valueSuffix={'%'}
inActiveStrokeColor={'#2ecc71'}
inActiveStrokeOpacity={0.2}
inActiveStrokeWidth={6}
duration={3000}
onAnimationComplete={() => setValue(50)}
/>
*/

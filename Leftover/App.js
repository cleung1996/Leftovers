import React, { useRef, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './navigation/tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Animated, StyleSheet, Button, TextInput, SafeAreaView, CroppingView, View, Text, TouchableOpacity, Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import users from './data/data.js';

const Home = ( {navigation, route} ) => {
  return (
    <Tabs data={route.params.params.data}/>
  )
};

const userChecker = (userObj) => {
  console.log(userObj);
  console.log(users);

  let results = users.filter(aUser => (aUser.email === userObj.userName && aUser.password && userObj.password));

  return results;
}

const FadeInLogin = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0

  React.useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 1500,
        delay: 8000,
        useNativeDriver: true,
      }
    ).start();
  }, [fadeAnim])

  return (
    <Animated.View
      style={{
        ...props.style,
        opacity: fadeAnim,         // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.View>

  )
}

const FadeInImgView = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0
  const translation = useRef(new Animated.Value(0)).current;
  Animated.sequence([
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }
    ),
    Animated.timing(
      translation,
      {
        toValue: -150,
        duration: 1000,
        delay: 5000,
        useNativeDriver: true,
      }
    )
  ]).start(), [fadeAnim, translation]

  return (
    <Animated.View                 // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim,         // Bind opacity to animated value
        transform: [{ translateY: translation }],
      }}
    >
      {props.children}
    </Animated.View>
  );
}

const FadeInView = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0
  React.useEffect(() => {
    Animated.sequence([
      Animated.timing(
        fadeAnim,
        {
          toValue: 1,
          duration: 2000,
          delay: props.props === 1 ? 500 : 4000,
          useNativeDriver: true,
        }
      ),
      Animated.timing(
        fadeAnim,
        {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }
      )
    ]).start();
  }, [fadeAnim])

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

const Main = ({ navigation }) => {
  const [username, setUser] = React.useState('')
  const [password, onChangePassword] = React.useState('')
  const [sample, onSample] = React.useState('sample');

  // const [name, setName] = useState(data.Name);
  // const [email, setEmail] = useState(data.email);
  // const [friends, setFriends] = useState(data.friends);
  // const [currentData, setCurrentData] = useState(data.currentData);
  // const [points, setPoints] = useState(data.points);
  // const [currentStatus, setStatus] = useState(data.status);
  // const [value, setValue] = useState(aFunction());
  // const [nextLevel, setNextLevel] = useState('something');

  //   let status = [
  //   { 'status': 'Bronze', 'points': 1000 },
  //   { 'status': 'Silver', 'points': 2000 },
  //   { 'status': 'Gold', 'points': 3000 },
  //   { 'status': 'Platinum', 'points': 4000 },
  //   { 'status': 'Diamond', 'points': 5000 },
  // ]



  return (
    <SafeAreaView style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    }}>
      <View>
        <FadeInView style={{ width: 250, height: 50 }} props={1}>
          <Text style={{ fontSize: 28, margin: 10, position: 'absolute', top: 110 }}>Hey there,</Text>
        </FadeInView>
        <FadeInView style={{ width: 300, height: 50 }} props={2}>
          <Text style={{ fontSize: 28, margin: 10, position: 'absolute', top: 60 }}>glad to have you here</Text>
        </FadeInView>
      </View>
      <FadeInImgView>
        <Image
          source={require('./images/output-onlinegiftools.gif')}

          resizeMode='contain'
          style={{
            width: 400,
            height: 600
          }}
        />
      </FadeInImgView>
      <FadeInLogin style={{ width: 300, height: 50 }}>
        <Text style={{ fontSize: 28, fontWeight: 'bold', margin: 10, position: 'absolute', top: -300}}>Login</Text>
        <Text style={{ fontSize: 15, margin: 10, position: 'absolute', top: -250}}>Email Address</Text>
        <TextInput style={styles.input1} onChangeText={setUser} value={username} placeholder="JohnDoe123" />
        <Text style={{ fontSize: 15, margin: 10, position: 'absolute', top: -170}}>Password</Text>
        <TextInput style={styles.input2} onChangeText={onChangePassword} value={password} placeholder="Password" />
      </FadeInLogin>
      <FadeInLogin>
        <View style={styles.button}>
          <Button color='navy' title="Submit" onPress={() => {
            let data = userChecker({'userName': username, 'password': password})
            return !!data.length ? navigation.navigate('Home', {screen: 'HomeScreen', params: {data}}) : alert('Invalid email and/or password')}
            } />
        </View>
      </FadeInLogin>
    </SafeAreaView>
  )
};
// navigation.navigate('Home', {screen: 'HomeScreen', params: {data}})

const Stack = createNativeStackNavigator();

const App = () => {
  return(
    <NavigationContainer >
      <Stack.Navigator
      screenOptions={{
        headerShown: false
        }}
      >
        <Stack.Screen component={Main} name="Main" />
        <Stack.Screen component={Home} name="Home" />
      </ Stack.Navigator>
    </NavigationContainer>
  )
};

const styles = StyleSheet.create({
  input1: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    top: -230
  },
  input2: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    top: -215
  },
  button: {
    borderRadius: 10,
    top: -100
  }
});

export default App;
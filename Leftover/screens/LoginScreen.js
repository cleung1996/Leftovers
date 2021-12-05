import React, { useRef, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Animated, StyleSheet, Button, TextInput, SafeAreaView, CroppingView, View, Text, TouchableOpacity, Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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

const LoginScreen = ({ navigation }) => {
  const [username, onChangeUser] = React.useState(null)
  const [password, onChangePassword] = React.useState(null)

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
          source={require('../images/output-onlinegiftools.gif')}

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
        <TextInput style={styles.input1} onChangeUser={onChangeUser} value={username} placeholder="JohnDoe123" />
        <Text style={{ fontSize: 15, margin: 10, position: 'absolute', top: -170}}>Password</Text>
        <TextInput style={styles.input2} onChangePassword={onChangePassword} value={password} placeholder="Password" />
      </FadeInLogin>
      <FadeInLogin>
        <View style={styles.button}>
          <Button color='navy' title="Submit" onPress={() => navigation.navigate('Home')} />
        </View>
      </FadeInLogin>
    </SafeAreaView>
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

export default LoginScreen;
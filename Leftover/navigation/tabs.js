import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faUserFriends, faUtensils, faShoppingBasket, faCalendar } from '@fortawesome/free-solid-svg-icons';

import HomeScreen from '../screens/HomeScreen';
import FriendsScreen from '../screens/FriendsScreen';
import RecipeScreen from '../screens/RecipeScreen';
import MarketScreen from '../screens/MarketScreen';
import ScheduleScreen from '../screens/ScheduleScreen';


const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        top: -30,
        justifyContent: 'center',
        alignItems: 'center',
        ...styles.shadow
      }}
      onPress={onPress}
    >
      <View style={{
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#e32f45'
      }}>
        {children}
      </View>
    </TouchableOpacity>
  );
};

const Tabs = ({ data }) => {
  console.log('tabs', data);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: '#ffffff',
          borderRadius: 15,
          height: 90,
          ...styles.shadow
        }
      }} >
      <Tab.Screen
        name="Recipes"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
              <FontAwesomeIcon
                icon={faUtensils}
                resizeMode='contain'
                size={30}
                style={{
                  color: focused ? '#e32f45' : '#748c94'
                }} />
              <Text style={{ color: focused ? '#e32f45' : '#748c94', fontSize: 12, paddingTop: 5 }}> Recipes </Text>
            </View>
          )
        }}
        children={(...props) => <RecipeScreen
          {...props}
          aData={data}
        />}
      />

      <Tab.Screen
        name="Schedule"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
              <FontAwesomeIcon
                icon={faCalendar}
                resizeMode='contain'
                size={30}
                style={{
                  color: focused ? '#e32f45' : '#748c94'
                }} />
              <Text style={{ color: focused ? '#e32f45' : '#748c94', fontSize: 12, paddingTop: 5 }}> Schedule </Text>
            </View>
          )
        }}
        children={(...props) => <ScheduleScreen
          {...props}
          bData={data}
        />}
      />
      <Tab.Screen name="HomeScreen" component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesomeIcon
              icon={faHome}
              resizeMode='contain'
              size={50}
              style={{
                color: focused ? '#ffffff' : '#ffffff'
              }} />
          ),
          tabBarButton: (props) => (
            <CustomTabBarButton {...props} />
          )
        }}
      />
      <Tab.Screen
        name="Market"
        component={MarketScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
              <FontAwesomeIcon
                icon={faShoppingBasket}
                resizeMode='contain'
                size={30}
                style={{
                  color: focused ? '#e32f45' : '#748c94'
                }} />
              <Text style={{ color: focused ? '#e32f45' : '#748c94', fontSize: 12, paddingTop: 5 }}> Market </Text>
            </View>
          )
        }} />
      <Tab.Screen
        name="Friends"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
              <FontAwesomeIcon
                icon={faUserFriends}
                resizeMode='contain'
                size={30}
                style={{
                  color: focused ? '#e32f45' : '#748c94'
                }} />
              <Text style={{ color: focused ? '#e32f45' : '#748c94', fontSize: 12, paddingTop: 5 }}> Friends </Text>
            </View>
          )
        }}
        children={(...props) => <FriendsScreen
          {...props}
          cData={data}
        />}
      />
    </Tab.Navigator>
  );

}

const styles = StyleSheet.create({
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
})

export default Tabs;


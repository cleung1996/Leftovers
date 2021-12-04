import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';


const HomeScreen = ({navigation}) => {
  return(
    <View style={styles.container}>
      <Text style={styles.text}>Hello World</Text>
      <Image source={{uri: 'https://randomuser.me/api/portraits/men/1.jpg'}} style={styles.img} />
      <FontAwesomeIcon icon={ faCoffee } />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text : {
    color: 'darkslateblue',
    fontSize: 30,
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 50
  }

})
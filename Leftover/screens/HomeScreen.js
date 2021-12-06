import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import CircularProgress from 'react-native-circular-progress-indicator';



const HomeScreen = ({ navigation, route }) => {
  let data = route.params.data[0];
  const [value, setValue] = useState(0);

  return (
    <SafeAreaView style={styles.container} >
      <ScrollView style={styles.scrollView} >
        <Text style={styles.text}>Welcome back, {data.Name}</Text>

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

        <FontAwesomeIcon icon={faCoffee} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#F6FADE',
  },
  scrollView: {
    backgroundColor: '#F6FADE',
    marginHorizontal: 30,
    marginTop: 20,
    marginBottom: 85
  },
  text: {
    color: 'darkgreen',
    fontSize: 24,
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 50
  }

})

/*
<View style={styles.container}>
<Text style={styles.text}>Hello World</Text>
<Image source={{uri: 'https://randomuser.me/api/portraits/men/1.jpg'}} style={styles.img} />
<FontAwesomeIcon icon={ faCoffee } />
</View>
*/

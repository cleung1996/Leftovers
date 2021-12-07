import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const RecipeScreen = (props) => {
  console.log('recipe', props.aData[0].currentData[0]);
  props.aData[0].currentData[0].Completed = 200;
  return(
    <View style={styles.container}>
      <Text>Recipe</Text>
      <Button title="Click Here" onPress={() => props['0'].navigation.navigate('HomeScreen', {screen: 'HomeScreen', data: props.aData})} />
    </View>
  );
};

export default RecipeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8fcbbc'
  },
});
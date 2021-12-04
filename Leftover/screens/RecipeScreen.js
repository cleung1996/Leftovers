import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const RecipeScreen = ({navigation}) => {
  return(
    <View style={styles.container}>
      <Text>Recipe</Text>
      <Button title="Click Here" onPress={() => alert('Button Clicked!')} />
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
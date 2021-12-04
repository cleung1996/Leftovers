import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const MarketScreen = ({navigation}) => {
  return(
    <View style={styles.container}>
      <Text>Market</Text>
      <Button title="Click Here" onPress={() => alert('Button Clicked!')} />
    </View>
  );
};

export default MarketScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8fcbbc'
  },
});
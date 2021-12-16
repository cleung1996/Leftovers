import React, { useRef, useEffect, useState } from 'react';
import { Animated, Modal, StyleSheet, Button, TextInput, SafeAreaView, CroppingView, View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';

const RecipeContainer = ({ data, idx }) => {

  const [modalDisplay, toggleModal] = useState(false);
  const createHashTag = (str) => {

    const words = str.split("-");
    let results = words.map((word) => {
      return word[0].toUpperCase() + word.substring(1);
    }).join(' ');

    let hashTag = results.replace(/\s/g, '');

    return '#' + hashTag;
  }

  return (
    <View key={idx}>
      <Modal visible={modalDisplay} animationType="slide">
        <SafeAreaView style={{ flex: 1, flexDirection: "column", justifyContent: "space-between" }}>
          <ScrollView>
            <View style={{ marginTop: 15, marginHorizontal: 15 }}>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text style={{ textTransform: 'capitalize', padding: 10, textAlign: 'center', fontSize: 24, fontWeight: 'bold' }}>{data.title}</Text>
                <View style={{ ...styles.shadow }}>
                  <Image source={{ uri: data.image }}
                    style={{ zIndex: 0, width: 250, height: 250, borderRadius: 10 }} />
                </View>
              </View>
              <View>
                <Text style={{ paddingTop: 30, fontSize: 20, paddingLeft: 20, fontWeight: 'bold' }}>Ingredients: </Text>
                {data.ingredientLines.map((anIngredient, index) => <Text style={{ paddingTop: 10, paddingLeft: 20, fontSize: 14, textTransform: 'capitalize' }} key={index}>{anIngredient}</Text>)}
                <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                  {data.dietLabels.length > 0 && (data.dietLabels.map((anIngredient, index) => <Text style={{ paddingTop: 10, paddingLeft: 20, fontSize: 14, fontWeight: 'bold', paddingTop: 20 }} key={index}>{createHashTag(anIngredient)}</Text>))}
                </View>
              </View>
            </View>
            <View style={{flexDirection: 'row-reverse', paddingTop: 20, marginHorizontal: 15}}>
              <Image
                source={require('../../images/carrotEating.gif')}
                resizeMode='contain'
                style={{
                  width: 130,
                  height: 130,
                  zIndex: 100,
                }}
              />

              <View style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <View style={{
                  borderRadius: 10,
                  width: 200,
                  padding: 10,
                  borderWidth: 2,
                  fontSize: 14,
                }}>
                  <Text style={{ textAlign: 'center'}} >Like what you see? Add to your favorites now!</Text>
                  <Button color="darkgreen" title="Add to Favorites" onPress={() => alert(`${data.title} was added to your favorites`)}/>
                </View>
              </View>
            </View>
            <View style={{ marginBottom: 40 }}>
              <Button title="Close" onPress={() => toggleModal(false)} />
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
      <TouchableOpacity style={{ ...styles.shadow, borderRadius: 10, overflow: 'hidden', width: 155, marginHorizontal: 0, height: 155, resizeMode: 'contain', marginTop: 10, zIndex: 10 }} onPress={() => toggleModal(true)}>
        <Image source={{ uri: data.image }}
          style={{ zIndex: 0, width: 155, height: 155 }} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  }
});

export default RecipeContainer;


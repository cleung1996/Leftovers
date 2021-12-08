import React, { useState } from 'react';
import { View, Image, Text, Button, StyleSheet, StatusBar, SafeAreaView, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import { app_id, app_key } from '../config/config.js';
import RecipeContainer from './components/recipeContainer.js';


const RecipeScreen = (props) => {
  console.log('recipe', props.aData[0].currentData[0]);
  props.aData[0].currentData[0].Completed = 200;
  const [recipeQuery, setRecipe] = useState('');
  const [receipeResults, setRecipeList] = useState([]);

  const searchRecipe = (item) => {

    //   axios.get('https://api.edamam.com/search', {
    //     "q": item,
    //     "app_id": {app_id},
    //     "app_key": {app_key},
    //     "from": 0,
    //     "to": 5,
    //   })
    //     .then((response) => {
    //       console.log('worked', response);
    //     })
    //     .catch((err) => console.log(err));
    // }

    axios.get(`https://api.edamam.com/search?q=${item}&app_id=${app_id}&app_key=${app_key}&to=30`)
      .then((response) => {
        let data = response.data.hits;
        let recipeList = [];

        for (let i = 0; i < data.length; i++) {
          let aResponse = {
            'title': data[i].recipe.label,
            'image': data[i].recipe.image,
            'source': data[i].recipe.source,
            'url': data[i].recipe.url,
            'ingredientLines': data[i].recipe.ingredientLines,
            'dishType': data[i].recipe.dishType,
            'dietLabels': data[i].recipe.dietLabels,
            'healthLabels': data[i].recipe.healthLabels
          }

          recipeList.push(aResponse);
        }
        setRecipeList(recipeList);
      })
      .catch((err) => console.log(err));

  }

  function createTrio() {
    const bucket = []
    let subBucket = []

    for (let i = 0; i < receipeResults.length; i++) {
      subBucket.push(<RecipeContainer key={i} data={receipeResults[i]} />)

      if (subBucket.length === 2 || (i + 1 === receipeResults.length)) {
        bucket.push((
          <View key={i} style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around', alignItems: 'center' }}>
            {subBucket}
          </View>
        ));
        subBucket = [];
      }
    }
    return bucket;
  }

  function renderImg() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 100 }}>
        <Image
          source={require('../images/carrotSick.gif')}
          resizeMode='contain'
          style={{
            width: 250,
            height: 250,
          }}
        />
        <Text style={{ fontSize: 20, color: 'darkgreen' }}>No results</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container} >
      <Text style={{
        color: 'darkgreen',
        fontSize: 28,
        marginTop: 30,
        marginLeft: 30,
        fontWeight: 'bold'
      }}>
        <Text>#foodstagram</Text>
      </Text>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 80,
      }}>
        <TextInput style={styles.input1} onChangeText={setRecipe} value={recipeQuery} placeholder="Spinach" />
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 50,
            width: 5,
            height: 5,
            ...styles.shadow
          }}
          onPress={() => searchRecipe(recipeQuery)}
        >
          <FontAwesomeIcon icon={faSearch} size={30} color={'darkgreen'} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView} >
        <View >
          {receipeResults.length
            ? createTrio()
            : renderImg()}
        </View>
      </ScrollView>
    </SafeAreaView >
  );
};

export default RecipeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#fff',
  },
  scrollView: {
    backgroundColor: '#fff',
    marginHorizontal: 30,
    marginBottom: 85,
    flex: 5
  },
  input1: {
    width: '70%',
    height: 40,
    marginLeft: 30,
    marginRight: 15,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  buttonSearch: {
    marginRight: 30,
  },
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
});

/*
    <View style={styles.container}>
      <Text>Recipe</Text>
      <Button title="Click Here" onPress={() => props['0'].navigation.navigate('HomeScreen', {screen: 'HomeScreen', data: props.aData})} />
    </View>
*/
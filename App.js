import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

function HomeScreen({navigation}) {

  const [word, onChangeText] = React.useState();
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  console.log(data);
  useEffect(() => {
    var url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + word;
    fetch(url)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [word])

  return (
    <View style={styles.container}>
      <View style={styles.container}>
          {isLoading ? (
            <View style={styles.roe}> 
              <Text>Loading</Text> 
              <ActivityIndicator size='large'/> 
            </View>
          ) : (
            <View style={styles.container}>
                <Image
                  style={styles.pic}
                  source={require('./assets/dictonary.png')}
                />
                <Text style={styles.title}>
                Dictionary
                </Text>
                <TextInput
                  style={styles.inputText}
                  placeholder='Enter your word...'
                  onChangeText={onChangeText}
                  value={word}
                /> 
            </View>
          )}
        
        <View style={styles.navbarContainer}>
            <TouchableHighlight style = {styles.navButton} underlayColor={'#0797f0'} onPress={() => navigation.navigate('Definition', {word})} >
              <Text style={styles.navButtonText}>
                Definition
              </Text>
            </TouchableHighlight>
            
            <TouchableHighlight style = {styles.navButton} underlayColor={'#0797f0'} onPress={() => navigation.navigate('Example', {word})} >
              <Text style={styles.navButtonText}>
                Example
              </Text>
            </TouchableHighlight>
        </View>

      </View>
    </View>
  );
}

function Definition({route, navigation}) {

  const {word} = route.params;
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  console.log(data);
  
  useEffect(() => {
    var url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + word;
    fetch(url)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [word])

  return (
    <View style={styles.container}>
    
        <ScrollView>
          <FlatList
            data={data}
            keyExtractor={({ id }) => id}
            renderItem={({ item }) => (
              <View style={styles.container}>
                <View style={styles.wordInfoBox}>
                  <Text style={styles.word}>
                    {item.word} {item.phonetic}
                  </Text>
                  <Text style={styles.heading}>
                    Definition:
                  </Text>
                  <Text style={styles.paragraph}>
                    {item.meanings[0].definitions[0].definition}
                    {'\n'}
                  </Text>
                </View>
              </View>
            )}
          />
        </ScrollView>

        <TouchableHighlight style = {styles.navButton} underlayColor={'#0797f0'} onPress={() => navigation.navigate('Example', {word})} >
          <Text style={styles.navButtonText}>
            Example
          </Text>
        </TouchableHighlight>  

    </View>
  );
}

function Example({route, navigation}) {

  const {word} = route.params;
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  console.log(data);
  
  useEffect(() => {
    var url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + word;
    fetch(url)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [word])

  return (
    <View style={styles.container}>

        <ScrollView>
            <FlatList
              data={data}
              keyExtractor={({ id }) => id}
              renderItem={({ item }) => (
                <View style={styles.container}>
                  <View style={styles.wordInfoBox}>
                    <Text style={styles.word}>
                      {item.word} {item.phonetic}
                    </Text>
                    <Text style={styles.heading}>
                      Example:
                    </Text>
                    <Text style={styles.paragraph}>
                      {item.meanings[0].definitions[0].example}
                    </Text>
                  </View>
                </View>
              )}
            />
      </ScrollView> 

      <TouchableHighlight style = {styles.navButton} underlayColor={'#0797f0'} onPress={() => navigation.navigate('Definition', {word})} >
        <Text style={styles.navButtonText}>
          Definition
        </Text>
      </TouchableHighlight>   

    </View>
  );
}

const Stack = createStackNavigator();
export default function App() {

  const [word, onChangeText] = React.useState();
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  console.log(data);
  
  useEffect(() => {
    var url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + word;
    fetch(url)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [word])

  return (
    <NavigationContainer>
      <Stack.Navigator mode= "modal">
        <Stack.Screen name= "Home" component={HomeScreen} />
        <Stack.Screen name= "Definition" component={Definition} />
        <Stack.Screen name= "Example" component={Example} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F6F6F6',
    padding: 8,
    height: deviceHeight,
    width: deviceWidth,
  },
  pic: {
    height: deviceHeight/8,
    width: deviceHeight/8,
  },
  roe: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: deviceWidth/10,
  },
  title: {
    margin: deviceWidth/15,
    fontFamily: 'serif',
    fontSize: deviceWidth/15,
    textAlign: 'center',
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  word: {
    fontSize: deviceWidth/14,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    fontFamily: 'serif',
    marginBottom: deviceWidth/20,
  },
  heading: {
    fontSize: deviceWidth/25,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  paragraph: {
    fontSize: deviceWidth/20,
    textAlign: 'center',
    fontFamily: 'serif',
    marginBottom: deviceWidth/20,
    marginTop: deviceWidth/40,
  },
  inputText: {
    fontSize: deviceWidth/50,
    textAlign: 'center',
    backgroundColor: 'white',
    height: deviceHeight/20,
    width: deviceWidth/4,
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: deviceWidth/200,
    marginBottom: deviceWidth/20,
    marginTop: deviceWidth/20,
    alignItems: 'center',
    borderRadius: 20,
  },
  navbarContainer: {
    height: deviceWidth/8,
    width: 9*deviceWidth/10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: deviceWidth/20,
  },
  navButton: {
    height: deviceWidth/16,
    width: deviceWidth/3.5,
    backgroundColor: '#5ea9e0',
    alignItems: 'center',
    justifyContent: 'center',
    margin: deviceWidth/20,
    borderRadius: deviceWidth/20,
    borderColor: '#edeff0',
    borderWidth: deviceWidth/100,
    
  },
  wordInfoBox: {
  justifyContent: 'center',
  alignItems: 'center',
  margin: deviceHeight / 30,
  backgroundColor: '#e1ecf7',
  borderBottomWidth: deviceWidth / 100,
  borderColor: 'lightgray',
  width: (4 * deviceWidth) / 5,
  borderRadius: 30,
  padding: deviceWidth / 30,
  minHeight: deviceHeight / 6,
},
  navButtonText: {
    fontSize: deviceWidth/30,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'arial',
  },
  
});

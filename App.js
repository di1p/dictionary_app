// App.js
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';

const MAX_CONTENT_WIDTH = 900;
const MAX_CARD_WIDTH = 800;

function HomeScreen({ navigation }) {
  const [word, onChangeText] = React.useState('');
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchWord = (w) => {
    if (!w) {
      setData([]);
      return;
    }
    setLoading(true);
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${w}`)
      .then((r) => r.json())
      .then((json) => setData(Array.isArray(json) ? json : []))
      .catch(() => setData([]))
      .finally(() => setLoading(false));
  };

  // fetch when word changes (debounced-ish simple)
  useEffect(() => {
    const id = setTimeout(() => fetchWord(word.trim()), 250);
    return () => clearTimeout(id);
  }, [word]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {isLoading ? (
          <View style={styles.roe}>
            <Text>Loading</Text>
            <ActivityIndicator size="large" style={{ marginLeft: 8 }} />
          </View>
        ) : (
          <View>
            <Image
              style={styles.pic}
              source={require('./assets/dictionary.png')} // change to './assets/dictonary.png' if that's your file
            />
            <Text style={styles.title}>Dictionary</Text>
            <TextInput
              style={styles.inputText}
              placeholder="Enter your word..."
              onChangeText={onChangeText}
              value={word}
            />
          </View>
        )}

        <View style={styles.navbarContainer}>
          <TouchableHighlight
            style={styles.navButton}
            underlayColor={'#0797f0'}
            onPress={() => navigation.navigate('Definition', { word })}
            disabled={!word}
          >
            <Text style={styles.navButtonText}>Definition</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.navButton}
            underlayColor={'#0797f0'}
            onPress={() => navigation.navigate('Example', { word })}
            disabled={!word}
          >
            <Text style={styles.navButtonText}>Example</Text>
          </TouchableHighlight>
        </View>

        {/* Show first result preview (optional) */}
        {!!data?.length && (
          <View style={styles.wordInfoBox}>
            <Text style={styles.word}>
              {data[0]?.word} {data[0]?.phonetic ?? ''}
            </Text>
            <Text style={styles.heading}>Definition:</Text>
            <Text style={styles.paragraph}>
              {data[0]?.meanings?.[0]?.definitions?.[0]?.definition ?? '—'}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

function Definition({ route, navigation }) {
  const { word } = route.params;
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const w = (word || '').trim();
    if (!w) {
      setData([]);
      setLoading(false);
      return;
    }
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${w}`)
      .then((r) => r.json())
      .then((json) => setData(Array.isArray(json) ? json : []))
      .catch(() => setData([]))
      .finally(() => setLoading(false));
  }, [word]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {isLoading ? (
          <View style={styles.roe}>
            <Text>Loading</Text>
            <ActivityIndicator size="large" style={{ marginLeft: 8 }} />
          </View>
        ) : (
          <ScrollView>
            <FlatList
              data={data}
              keyExtractor={(_, idx) => String(idx)} // API items don't have stable ids
              renderItem={({ item }) => (
                <View style={styles.wordInfoBox}>
                  <Text style={styles.word}>
                    {item?.word} {item?.phonetic ?? ''}
                  </Text>
                  <Text style={styles.heading}>Definition:</Text>
                  <Text style={styles.paragraph}>
                    {item?.meanings?.[0]?.definitions?.[0]?.definition ?? '—'}
                  </Text>
                </View>
              )}
            />
          </ScrollView>
        )}

        <TouchableHighlight
          style={styles.navButton}
          underlayColor={'#0797f0'}
          onPress={() => navigation.navigate('Example', { word })}
        >
          <Text style={styles.navButtonText}>Example</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

function Example({ route, navigation }) {
  const { word } = route.params;
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const w = (word || '').trim();
    if (!w) {
      setData([]);
      setLoading(false);
      return;
    }
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${w}`)
      .then((r) => r.json())
      .then((json) => setData(Array.isArray(json) ? json : []))
      .catch(() => setData([]))
      .finally(() => setLoading(false));
  }, [word]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {isLoading ? (
          <View style={styles.roe}>
            <Text>Loading</Text>
            <ActivityIndicator size="large" style={{ marginLeft: 8 }} />
          </View>
        ) : (
          <ScrollView>
            <FlatList
              data={data}
              keyExtractor={(_, idx) => String(idx)}
              renderItem={({ item }) => (
                <View style={styles.wordInfoBox}>
                  <Text style={styles.word}>
                    {item?.word} {item?.phonetic ?? ''}
                  </Text>
                  <Text style={styles.heading}>Example:</Text>
                  <Text style={styles.paragraph}>
                    {item?.meanings?.[0]?.definitions?.[0]?.example ?? '—'}
                  </Text>
                </View>
              )}
            />
          </ScrollView>
        )}

        <TouchableHighlight
          style={styles.navButton}
          underlayColor={'#0797f0'}
          onPress={() => navigation.navigate('Definition', { word })}
        >
          <Text style={styles.navButtonText}>Definition</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Definition" component={Definition} />
        <Stack.Screen name="Example" component={Example} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/* --------- Responsive styles (no hard-coded device width/height) --------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  content: {
    width: '100%',
    maxWidth: MAX_CONTENT_WIDTH,
    paddingHorizontal: 16,
    paddingTop: 24,
    alignSelf: 'center',
  },

  pic: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 16,
  },
  title: {
    marginVertical: 12,
    fontFamily: 'serif',
    fontSize: 32,
    textAlign: 'center',
    color: 'black',
  },

  inputText: {
    fontSize: 16,
    textAlign: 'center',
    backgroundColor: 'white',
    height: 40,
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
    marginVertical: 16,
  },

  navbarContainer: {
    width: '100%',
    maxWidth: MAX_CONTENT_WIDTH,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  navButton: {
    height: 44,
    minWidth: 140,
    paddingHorizontal: 16,
    backgroundColor: '#5ea9e0',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderColor: '#edeff0',
    borderWidth: 1,
  },
  navButtonText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'arial',
  },

  wordInfoBox: {
    width: '100%',
    maxWidth: MAX_CARD_WIDTH,
    alignSelf: 'center',
    backgroundColor: '#e1ecf7',
    borderColor: 'lightgray',
    borderBottomWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginVertical: 16,
  },
  word: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginBottom: 12,
    fontFamily: 'serif',
  },
  heading: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  paragraph: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'serif',
    marginTop: 8,
    marginBottom: 12,
  },

  roe: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

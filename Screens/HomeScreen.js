import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image
} from 'react-native';
import { Header } from 'react-native-elements';
 
export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      word: '',
      definition: '', 
      phonetics: '',
    };
  }
  getWord = (word) => {
    var url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + word;
    return fetch(url)
      .then((data) => {
        return data.json();
      })
      .then((response) => {
        var word = response[0].word;
        var definition = response[0].meanings[0].definitions[0].definition;
        this.setState({
          word: word.trim(),
          definition: definition.trim(),
        });
      });
  };

  render() {
    return (
      <View>
        <Header
          backgroundColor={'royalblue'}
          centerComponent={{
            text: 'Pocket Dictionary',

            style: {
              backgroundColor: 'royalblue',
              fontFamily: 'Rockwell',
              fontSize: 23,
              fontWeight: "bold"
            },
          }}
        />
        <Image
          style={{
            width: 180,
            height: 180,
            borderColor: 'black',
            borderWidth: 4,
            marginTop: 20,
            marginLeft: 60,
          }}
          source={{
            uri:
              'https://thumbs.dreamstime.com/z/cartoon-old-vintage-book-book-old-vintage-textbook-encyclopedia-dictionary-fairy-tale-book-happy-cartoon-design-kids-119044605.jpg',
          }}
        />

        <TextInput
          style={styles.searchBox}
          onChangeText={(text) => {
            this.setState({
              text: text,
              isSearchedPressed: false,
              word: 'Loading....',
              lexicalCategory: '',
              examples: [],
              definition: '',
            });
          }}
        />

        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => {
            this.setState({ isSearchedPressed: true });
            this.getWord(this.state.text);
          }}>
          <Text style={styles.text1}> Search </Text>
        </TouchableOpacity>

        <Text style={styles.text}>{this.state.word}</Text>
        <Text style={styles.text}>{this.state.definition}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchBox: {
    marginTop: 20,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    fontFamily: 'Rockwell',
    fontSize: 20,
    fontWeight: "bold",
    borderWidth: 4,
    borderColor: 'black',
    outline: 'none',
    backgroundColor: 'white',
  },
  searchButton: {
    width: '40%',
    height: 50,
    alignSelf: 'center',
    padding: 5,
    margin: 10,
    borderWidth: 4,
    borderRadius: 10,
    borderColor: 'black',
    backgroundColor: 'red',
  },
  text1: {
    fontWeight: "bold",
    textAlign: 'center',
    fontFamily: 'Rockwell',
    fontSize: 25,
    alignSelf: 'center',
  },
  text: {
    fontFamily: 'Rockwell',
    fontSize: 20,
    color:'black',
    fontWeight: "bold",
  },
});
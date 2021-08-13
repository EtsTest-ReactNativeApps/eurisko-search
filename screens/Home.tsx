import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import { LocalData } from '../typeScriptInterfaces/interfaces';
import CustomFlatList from '../components/CustomFlatList';

const Home = ({ navigation }: { navigation: NavigationStackProp }) => {
  const [text, setText] = useState('');
  const [page, setPage] = useState(0);
  const [localData, setLocalData] = useState<LocalData>([]);

  const fetchTwoRequests = () => {
    const url1 = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${text}&api-key=OAD0Qz0csaoDZLpw5ZR74TCeSjynnabJ&page=${page}`;
    const url2 = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${text}&api-key=OAD0Qz0csaoDZLpw5ZR74TCeSjynnabJ&page=${
      page + 1
    }`;

    const requestOne = axios.get(url1);
    const requestTwo = axios.get(url2);

    axios
      .all([requestOne, requestTwo])
      .then(
        axios.spread((...responses) => {
          const responseOne = responses[0].data.response.docs;
          const responseTwo = responses[1].data.response.docs;

          if (page === 0) {
            setLocalData([...responseOne, ...responseTwo]);
          } else {
            setLocalData(prevData => [
              ...prevData,
              ...responseOne,
              ...responseTwo,
            ]);
          }
        }),
      )
      .catch(err => {
        if (axios.isCancel(err)) return;
      });
  };

  useEffect(() => {
    fetchTwoRequests();
    // I'm not using a clear method here because it will be useless
  }, [page]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={text => setText(text)}
        value={text}
        placeholder="Search"
      />
      <TouchableOpacity
        onPress={() => (page ? setPage(0) : fetchTwoRequests())}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
      <CustomFlatList
        setPage={setPage}
        localData={localData}
        navigation={navigation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    borderRadius: 4,
    width: '95%',
    padding: 18,
    borderWidth: 1,
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 10,
    borderRadius: 4,
    backgroundColor: '#3f51b5',
    width: '95%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
});

export default Home;

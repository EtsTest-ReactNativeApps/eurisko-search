import axios from 'axios';
import 'react-native-get-random-values';
import { nanoid } from 'nanoid';
import React, { useEffect } from 'react';
import { useState } from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import ListItem from '../components/ListItem';
import { LocalData } from '../typeScriptInterfaces/interfaces';

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

          console.log(page);
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
  }, [page]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={text => setText(text)}
        value={text}
        placeholder="Search"
      />
      <Button title="Search" onPress={() => setPage(0)} />
      <FlatList
        style={styles.list}
        data={localData}
        renderItem={({ item }) => (
          <ListItem item={item} navigation={navigation} />
        )}
        keyExtractor={() => nanoid()}
        onEndReached={() => setPage(prevPage => prevPage + 2)}
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
  list: {
    marginTop: 20,
  },
});

export default Home;

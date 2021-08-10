import axios, { AxiosResponse, CancelTokenSource } from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import ListItem from '../components/ListItem';
import { Data, LocalData } from '../typeScriptInterfaces/interfaces';

const Home = ({ navigation }: { navigation: NavigationStackProp }) => {
  const [text, setText] = useState('');
  const [page, setPage] = useState(0);
  const [LocalData, setLocalData] = useState<LocalData>([]);

  const fetchTwoRequests = () => {
    console.log('triggered');
    const url1 = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${text}&api-key=OAD0Qz0csaoDZLpw5ZR74TCeSjynnabJ&page=${page}`;
    const url2 = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${text}&api-key=OAD0Qz0csaoDZLpw5ZR74TCeSjynnabJ&page=${
      page + 1
    }`;

    const cancelToken1 = axios.CancelToken.source();
    const cancelToken2 = axios.CancelToken.source();

    const requestOne = axios.get(url1, { cancelToken: cancelToken1.token });
    const requestTwo = axios.get(url2, { cancelToken: cancelToken2.token });

    axios
      .all([requestOne, requestTwo])
      .then(
        axios.spread((...responses) => {
          const responseOne = responses[0].data.response.docs;
          const responseTwo = responses[1].data.response.docs;

          setLocalData([...responseOne, ...responseTwo]);
        }),
      )
      .catch(err => {
        if (axios.isCancel(err)) return;
      });

    return { cancelToken1, cancelToken2 };
  };

  useEffect(() => {
    const { cancelToken1, cancelToken2 } = fetchTwoRequests();

    return () => {
      cancelToken1.cancel();
      cancelToken2.cancel();
    };
  }, [text]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={text => setText(text)}
        value={text}
        placeholder="Search"
      />
      <FlatList
        data={LocalData}
        renderItem={({ item }) => (
          <ListItem item={item} navigation={navigation} />
        )}
        keyExtractor={item => item['_id']}
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
});

export default Home;

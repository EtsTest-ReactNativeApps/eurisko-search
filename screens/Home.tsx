import axios, { CancelTokenSource } from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
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
    const timeoutToFetchData: ReturnType<typeof setTimeout> = setTimeout(
      () => fetchTwoRequests(),
      1000,
    );

    // Cancel the request if the user is still typing
    return () => {
      clearTimeout(timeoutToFetchData);
    };
  }, [page, text]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={text => {
          setPage(0);
          setText(text);
        }}
        value={text}
        placeholder="Search"
      />
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
});

export default Home;

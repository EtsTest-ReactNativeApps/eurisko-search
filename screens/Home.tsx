import axios, { AxiosResponse } from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import ListItem from '../components/ListItem';

const Home = ({ navigation }: { navigation: NavigationStackProp }) => {
  const [text, setText] = useState('');

  interface LocalData
    extends Array<{
      _id: string;
      lead_paragraph: string;
      headline: { main: string };
    }> {}

  const [LocalData, setLocalData] = useState<LocalData>([]);

  interface Data {
    response: {
      docs: [];
    };
  }

  useEffect(() => {
    (async () => {
      try {
        const { data }: AxiosResponse<Data> = await axios.get(
          'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=Iraq&api-key=OAD0Qz0csaoDZLpw5ZR74TCeSjynnabJ&page=0',
        );
        setLocalData([...data.response.docs]);
      } catch (error) {}
    })();

    (async () => {
      try {
        const { data }: AxiosResponse<Data> = await axios.get(
          'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=Iraq&api-key=OAD0Qz0csaoDZLpw5ZR74TCeSjynnabJ&page=1',
        );
        setLocalData(prevData => [...prevData, ...data.response.docs]);
      } catch (error) {}
    })();
  }, []);

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

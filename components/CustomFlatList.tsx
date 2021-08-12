import React, { memo } from 'react';
import { NavigationStackProp } from 'react-navigation-stack';
import { FlatList } from 'react-native';
import { LocalData } from '../typeScriptInterfaces/interfaces';
import ListItem from './ListItem';
import { nanoid } from 'nanoid';

const CustomFlatList = ({
  localData,
  setPage,
  navigation,
}: {
  navigation: NavigationStackProp;
  setPage: (value: React.SetStateAction<number>) => void;
  localData: LocalData;
}) => {
  return (
    <FlatList
      style={styles.list}
      data={localData}
      renderItem={({ item }) => (
        <ListItem item={item} navigation={navigation} />
      )}
      keyExtractor={() => nanoid()}
      onEndReached={() => setPage((prevPage: number) => prevPage + 2)}
    />
  );
};

const styles = {
  list: {
    marginTop: 10,
  },
};

export default memo(CustomFlatList);

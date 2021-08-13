import React, { memo } from 'react';
import 'react-native-get-random-values';
import { NavigationStackProp } from 'react-navigation-stack';
import { FlatList } from 'react-native';
import { nanoid } from 'nanoid';
import { Item, LocalData } from '../typeScriptInterfaces/interfaces';
import ListItem from './ListItem';

const CustomFlatList = ({
  localData,
  setPage,
  navigation,
}: {
  navigation: NavigationStackProp;
  setPage: (value: React.SetStateAction<number>) => void;
  localData: LocalData;
}) => {
  // It's recommended to created a named function instead of passing an anonymous function, this is for the performance purposes
  const renderedItem = ({ item }: { item: Item }) => (
    <ListItem item={item} navigation={navigation} />
  );

  return (
    <FlatList
      style={styles.list}
      data={localData}
      renderItem={renderedItem}
      keyExtractor={() => nanoid()}
      onEndReached={() => setPage((prevPage: number) => prevPage + 2)}
      // This is recommended for the performance
      getItemLayout={(_, index) => ({
        length: 115,
        offset: 115 * index,
        index,
      })}
    />
  );
};

const styles = {
  list: {
    marginTop: 10,
  },
};

export default memo(CustomFlatList);

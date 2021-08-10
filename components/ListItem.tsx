import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';

interface Item {
  id: string;
  title: string;
}

const ListItem = ({
  item,
  navigation,
}: {
  item: Item;
  navigation: NavigationStackProp;
}) => {
  const pressHandler = () => {
    navigation.navigate('Details');
  };

  return (
    <TouchableOpacity onPress={pressHandler}>
      <Text>{item.title}</Text>
    </TouchableOpacity>
  );
};

export default ListItem;

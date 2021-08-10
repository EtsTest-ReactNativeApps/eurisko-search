import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';

interface Item {
  _id: string;
  lead_paragraph: string;
  headline: { main: string };
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
      <Text>{item['lead_paragraph']}</Text>
    </TouchableOpacity>
  );
};

export default ListItem;

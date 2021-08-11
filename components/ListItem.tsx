import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import { Item } from '../typeScriptInterfaces/interfaces';

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
    <TouchableOpacity style={styles.item} onPress={pressHandler}>
      <Text>{item['lead_paragraph']}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    marginTop: 20,
  },
});

export default ListItem;

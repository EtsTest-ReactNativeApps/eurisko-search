import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
      <View>
        <Image
          style={styles.tinyImage}
          source={{
            uri: 'https://icons-for-free.com/iconfiles/png/512/gallery+image+landscape+mobile+museum+open+line+icon-1320183049020185924.png',
          }}
        />
      </View>
      <View style={styles.secondaryView}>
        <Text style={styles.title}>{item.headline.main}</Text>
        <Text>{item['lead_paragraph']}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tinyImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
    // marginRight: 10,
  },
  secondaryView: {
    maxWidth: '75%',
  },
  title: {
    fontWeight: '800',
  },
});

export default ListItem;

import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import { Item } from '../typeScriptInterfaces/interfaces';
import { shortString } from '../utils/shortString';

const ListItem = ({
  item,
  navigation,
}: {
  item: Item;
  navigation: NavigationStackProp;
}) => {
  // If there's a photo, then show it, if not, fallback to another one.
  const imageUrl = !!item.multimedia[0]?.url
    ? `https://static01.nyt.com/${item.multimedia[0].url}`
    : 'https://icons-for-free.com/iconfiles/png/512/gallery+image+landscape+mobile+museum+open+line+icon-1320183049020185924.png';

  const pressHandler = () => {
    navigation.navigate('Details', {
      imageUrl,
      title: item.headline.main,
      category: item['type_of_material'],
      link: item['web_url'],
      description: item['lead_paragraph'],
    });
  };

  return (
    <TouchableOpacity style={styles.item} onPress={pressHandler}>
      <View>
        {/* I wanted to use FastImage package, but it's not supported in Expo Go app that's been downloaded from the PlayStore and AppleStore. */}
        <Image
          style={styles.tinyImage}
          source={{
            uri: imageUrl,
          }}
          defaultSource={require('../assets/blank.png')}
          accessibilityLabel="Article Photo"
        />
      </View>
      <View style={styles.secondaryView}>
        <Text style={styles.title}>{shortString(item.headline.main, 75)}</Text>
        <Text>{shortString(item['lead_paragraph'], 100)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    height: 115,
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
  },
  secondaryView: {
    maxWidth: '75%',
  },
  title: {
    fontWeight: '800',
  },
});

export default ListItem;

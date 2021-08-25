import React from 'react';
import {
  Image,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const Details = ({
  route,
}: {
  route: {
    params: {
      imageUrl: string;
      title: string;
      category: string;
      link: string;
      description: string;
    };
  };
}) => {
  const { imageUrl, title, category, link, description } = route.params;

  const onShare = async () => {
    try {
      await Share.share({ message: link });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
        resizeMode="contain"
        defaultSource={require('../assets/blank.png')}
        accessibilityLabel="Article Photo"
      />
      <View>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.categoryView}>
          <Text style={styles.category}>{category}</Text>
          <TouchableOpacity onPress={onShare} style={styles.shareButton}>
            <Text style={styles.shareText}>Share</Text>
          </TouchableOpacity>
        </View>
        <Text>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  image: {
    width: '100%',
    height: 250,
    marginBottom: 10,
  },
  title: {
    fontWeight: '800',
  },
  categoryView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  shareButton: {
    padding: 8,
    marginLeft: 10,
    backgroundColor: '#3f51b5',
    borderRadius: 5,
  },
  shareText: {
    color: '#fff',
  },
  category: {
    borderRadius: 10,
    borderColor: '#3f51b5',
    borderWidth: 1,
    padding: 5,
  },
});

export default Details;

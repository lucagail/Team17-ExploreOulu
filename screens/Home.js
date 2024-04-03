import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.tileContainer}>
        <TouchableOpacity
          style={[styles.tile, { marginBottom: 40 }]}
          onPress={() => navigation.navigate('Sightseeing')}>
          <Image source={require('/Users/lucagail/Team17-ExploreOulu/assets/Oulu_1.jpg')} style={styles.tileImage} />
          <Text style={styles.tileText}>Sightseeing</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tile, { marginTop: 40 }]}
          onPress={() => navigation.navigate('Hotels')}>
          <Image source={require('/Users/lucagail/Team17-ExploreOulu/assets/Oulu_1.jpg')} style={styles.tileImage} />
          <Text style={styles.tileText}>Hotels</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tile, { marginBottom: 40 }]}
          onPress={() => navigation.navigate('Restaurants')}>
          <Image source={require('/Users/lucagail/Team17-ExploreOulu/assets/Oulu_1.jpg')} style={styles.tileImage} />
          <Text style={styles.tileText}>Restaurants</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tile, { marginTop: 40 }]}
          onPress={() => navigation.navigate('Tours')}>
          <Image source={require('/Users/lucagail/Team17-ExploreOulu/assets/Oulu_1.jpg')} style={styles.tileImage} />
          <Text style={styles.tileText}>Tours</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tile, { marginBottom: 40 }]}
          onPress={() => navigation.navigate('OneDayInOulu')}>
          <Image source={require('/Users/lucagail/Team17-ExploreOulu/assets/Oulu_1.jpg')} style={styles.tileImage} />
          <Text style={styles.tileText}>1 Day In Oulu</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tile, { marginTop: 40 }]}
          onPress={() => navigation.navigate('PeoplesChoice')}>
          <Image source={require('/Users/lucagail/Team17-ExploreOulu/assets/Oulu_1.jpg')} style={styles.tileImage} />
          <Text style={styles.tileText}>People's Choice</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tile, { marginBottom: 40 }]}
          onPress={() => navigation.navigate('AboutOulu')}>
          <Image source={require('/Users/lucagail/Team17-ExploreOulu/assets/Oulu_1.jpg')} style={styles.tileImage} />
          <Text style={styles.tileText}>About Oulu</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tile, { marginTop: 40 }]}
          onPress={() => navigation.navigate('ContactUs')}>
          <Image source={require('/Users/lucagail/Team17-ExploreOulu/assets/Oulu_1.jpg')} style={styles.tileImage} />
          <Text style={styles.tileText}>Contact Us</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = {
  container: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  tileContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  tile: {
    width: '45%',
    aspectRatio: 1, 
    borderRadius: 10,
    overflow: 'hidden',
  },
  tileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  tileText: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(33, 58, 92, 0.9)',
    padding: 10,
    color: '#D6C9B6',
    textAlign: 'center',
    fontWeight: 'bold',
  },
};


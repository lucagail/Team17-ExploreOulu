import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../style/HomeStyle';


export default function Home() {
  
  const navigation = useNavigation();


  return (
    <View style={styles.container}>
    <ScrollView>
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Hotels')} style={styles.imageWrapper}>
            <Image
              source={require('/Users/lucagail/Team17-ExploreOulu/assets/house-5148865_1920.jpg')}
              style={styles.image}
            />
            <View style={styles.titleContainerLeft}>
              <Text style={styles.imageTextLeft}>Hotels</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Sightseeing')} style={styles.imageWrapper}>
            <Image
              source={require('/Users/lucagail/Team17-ExploreOulu/assets/oulu-2035445_1920.jpg')}
              style={styles.image}
            />
            <View style={styles.titleContainerRight}>
              <Text style={styles.imageTextRight}>Sightseeing</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Restaurants')} style={styles.imageWrapper}>
            <Image
              source={require('/Users/lucagail/Team17-ExploreOulu/assets/Oulu_1.jpg')}
              style={styles.image}
            />
            <View style={styles.titleContainerLeft}>
              <Text style={styles.imageTextLeft}>Restaurants</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Tours')} style={styles.imageWrapper}>
            <Image
              source={require('/Users/lucagail/Team17-ExploreOulu/assets/Oulu_1.jpg')}
              style={styles.image}
            />
            <View style={styles.titleContainerRight}>
              <Text style={styles.imageTextRight}>Tours</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('AboutOulu')} style={styles.imageWrapper}>
            <Image
              source={require('/Users/lucagail/Team17-ExploreOulu/assets/Oulu_1.jpg')}
              style={styles.image}
            />
            <View style={styles.titleContainerLeft}>
              <Text style={styles.imageTextLeft}>About Oulu</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Favorites')} style={styles.imageWrapper}>
            <Image
              source={require('/Users/lucagail/Team17-ExploreOulu/assets/Oulu_1.jpg')}
              style={styles.image}
            />
            <View style={styles.titleContainerRight}>
              <Text style={styles.imageTextRight}>Favorites</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};


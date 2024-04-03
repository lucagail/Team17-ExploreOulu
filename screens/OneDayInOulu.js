import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function OneDayInOulu() {
  
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
    <ScrollView>
    <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Ionicons name="arrow-back" size={20} color="#213A5C" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>1 Day in Oulu</Text>
      </View>
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Map')} style={styles.imageWrapper}>
            <Image
              source={require('/Users/lucagail/Team17-ExploreOulu/assets/Oulu_1.jpg')}
              style={styles.image}
            />
            <View style={styles.titleContainerLeft}>
              <Text style={styles.imageTextLeft}>Titel 1</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Map')} style={styles.imageWrapper}>
            <Image
              source={require('/Users/lucagail/Team17-ExploreOulu/assets/Oulu_1.jpg')}
              style={styles.image}
            />
            <View style={styles.titleContainerRight}>
              <Text style={styles.imageTextRight}>Titel 2</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity oonPress={() => navigation.navigate('Map')} style={styles.imageWrapper}>
            <Image
              source={require('/Users/lucagail/Team17-ExploreOulu/assets/Oulu_1.jpg')}
              style={styles.image}
            />
            <View style={styles.titleContainerLeft}>
              <Text style={styles.imageTextLeft}>Titel 3</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Map')} style={styles.imageWrapper}>
            <Image
              source={require('/Users/lucagail/Team17-ExploreOulu/assets/Oulu_1.jpg')}
              style={styles.image}
            />
            <View style={styles.titleContainerRight}>
              <Text style={styles.imageTextRight}>Titel 4</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  imageContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: 20
  },
  imageWrapper: {
    marginBottom: 10,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  titleContainerLeft: {
    position: 'absolute',
    top: '100%',
    left: 10,
    backgroundColor: 'rgba(33, 58, 92, 0.9)', 
    padding: 10,
    borderRadius: 10,
    transform: [{ translateY: -50 }],
    width: '60%',
  },
  imageTextLeft: {
    color: '#B7A38C',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
    
  },
  titleContainerRight: {
    position: 'absolute',
    top: '100%',
    right: 10,
    backgroundColor: 'rgba(33, 58, 92, 0.9)', 
    padding: 10,
    borderRadius: 10,
    transform: [{ translateY: -50 }],
    width: '60%',
  },
  imageTextRight: {
    color: '#B7A38C',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
    
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 12,
    marginHorizontal: 20,  
  },
  backButton: {
   flexDirection: 'row',
   alignItems: 'center',
 },
 backText: {
   fontSize: 16,
   fontWeight: 'bold',
   color: '#213A5C',
   marginLeft: 5,
 },
 titleContainer: {
  marginBottom: 10,
  marginLeft: 20
},
title: {
  fontSize: 24,
  fontWeight: 'bold',
  color: '#213A5C',
},
});


import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { Card, Title, Text } from 'react-native-paper';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function Restaurants() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleBackPress = () => {
    navigation.navigate('Home');
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    if (!isFocused) {
      setSelectedCategory('All');
    }
  }, [isFocused]);

  const restaurants = [
    {
      name: 'Restaurant 1 (10-20€)',
      description: 'Description of Restaurant 1 for 10-20€ category.',
      location: 'Location 1',
      imageUri: 'https://via.placeholder.com/300'
    },
    {
      name: 'Restaurant 2 (10-20€)',
      description: 'Description of Restaurant 2 for 10-20€ category.',
      location: 'Location 2',
      imageUri: 'https://via.placeholder.com/300'
    },
    {
      name: 'Restaurant 1 (20-30€)',
      description: 'Description of Restaurant 1 for 20-30€ category.',
      location: 'Location 1',
      imageUri: 'https://via.placeholder.com/300'
    },
    {
      name: 'Restaurant 2 (20-30€)',
      description: 'Description of Restaurant 2 for 20-30€ category.',
      location: 'Location 2',
      imageUri: 'https://via.placeholder.com/300'
    },
    {
      name: 'Restaurant 1 (30-40€)',
      description: 'Description of Restaurant 1 for 30-40€ category.',
      location: 'Location 1',
      imageUri: 'https://via.placeholder.com/300'
    },
    {
      name: 'Restaurant 2 (30-40€)',
      description: 'Description of Restaurant 2 for 30-40€ category.',
      location: 'Location 2',
      imageUri: 'https://via.placeholder.com/300'
    }
  ];

  const filteredRestaurants = selectedCategory === 'All' ? restaurants : restaurants.filter(restaurant => restaurant.name.includes(selectedCategory));

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Ionicons name="arrow-back" size={20} color="#213A5C" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Restaurants</Text>
      </View>
      <View style={styles.categoriesContainer}>
        {['All', '10-20€', '20-30€', '30-40€'].map(category => (
          <TouchableOpacity
            key={category}
            style={[styles.categoryButton, selectedCategory === category ? styles.selectedCategory : null]}
            onPress={() => handleCategorySelect(category)}>
            <Text style={[styles.categoryText, selectedCategory === category ? styles.selectedCategoryText : null]}>{category}</Text> 
          </TouchableOpacity>
        ))}
      </View>
      {filteredRestaurants.map((restaurant, index) => (
        <Card key={index} style={styles.card}>
          <Card.Cover source={{ uri: restaurant.imageUri }} />
          <Card.Content>
            <Title style={styles.name}>{restaurant.name}</Title>
            <Text style={styles.description}>{restaurant.description}</Text>
            <Text style={styles.location}>{restaurant.location}</Text>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  card: {
    marginVertical: 12,
    marginHorizontal: 20,
  },
  location: {
    fontSize: 16,
    marginTop: 8,
    textAlign: 'right'
  },
  name: {
    color: '#213A5C',
  },
  description: {
    fontSize: 14,
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
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    marginHorizontal: 20
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#213A5C',
  },
  selectedCategory: {
    backgroundColor: '#213A5C',
  },
  categoryText: {
    color: '#213A5C',
    fontSize: 14,
    fontWeight: 'bold',
  },
  selectedCategoryText: {
    color: '#D6C9B6',
    fontSize: 14,
    fontWeight: 'bold',
  }
});

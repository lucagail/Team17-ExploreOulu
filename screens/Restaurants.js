import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Modal, Image, TouchableOpacity } from 'react-native';
import { Card, Title, Text, Button } from 'react-native-paper';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../style/RestaurantsStyle';

export default function Restaurants() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const isFocused = useIsFocused();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);


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

  const openModal = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  const openMapWithAddress = (location) => {
    navigation.navigate('Map', { location });
  };

  const restaurants = [
    {
      name: 'Pizzeria Da Mario',
      price: '10-20€',
      description: "Oulu's oldest pizzeria, Da Mario, serves delicious pizzas and a fresh salad from its wide selection as an appetizer. We focus on quality and serve only the best! The best pizza in Oulu since 1982!",
      location: 'Torikatu 24, 90100 Oulu',
      imageUri: 'https://via.placeholder.com/300'
    },
    {
      name: 'Pancho Villa',
      price: '10-20€',
      description: "Good food lovers, welcome to enjoy great Mexican flavours and good vibes! We offer generous portions of legendary burgers, juicy steaks, fresh salads, fajitas, burritos and other Mexican delicacies. We also have a special menu for kids. Welcome to our atmospheric family restaurant!",
      location: 'Kauppurienkatu 6-8, 90100 Oulu',
      imageUri: 'https://via.placeholder.com/300'
    },
    {
      name: 'Alfred kitchen & bar',
      price: '20-30€',
      description: "Welcome to Alfred's Nomadic Kitchen, where the spirit of adventure meets the warmth of home. Inspired by a lifetime of travel and culinary exploration, Alfred brings you a menu filled with tales from distant lands and flavours perfected over decades. Settle in for a journey of taste with cherished recipes from ship mess halls and a touch of hometown comfort from Oulu. Join us for a dining experience where good food, great drinks, and heartfelt hospitality await. Let Alfred's wanderlust awaken your taste buds.",
      location: 'Pakkahuoneenkatu 24, 90100 Oulu',
      imageUri: 'https://via.placeholder.com/300'
    },
    {
      name: 'Fuchka',
      price: '20-30€',
      description: "Are you searching for a different culinary experience? Welcome to FUCHKA, the only Bangladeshi restaurant in Finland, located in Oulu. Fuchka means delicious Bangladeshi finger food that local people typically buy from the street bazaars. In addition to Fuchka, we also offer many other authentic Bangladeshi dishes like Samosa, Signara and Alu Chop- accompanied with a freshly baked, flavoured Bangladeshi bread.",
      location: 'Nummikatu 32, 90100 Oulu',
      imageUri: 'https://via.placeholder.com/300'
    },
    {
      name: 'Sokeri-Jussin Kievari',
      price: '30-50€',
      description: "Sokeri-Jussi Tavern is an atmospheric restaurant located in a timber storehouse in Pikisaari. The Tevern kitchen creates a delicious Finnish menu out of pure domestic ingredients flovoured with the delicacies of the season. Local food is naturally the cornerstone of the Tavern cuisine.",
      location: 'Pikisaarentie 2, 90100 Oulu',
      imageUri: 'https://via.placeholder.com/300'
    },
    {
      name: 'Uleaborg 1881',
      price: '30-50€',
      description: "Since 2003, we have wanted to present our own seasonal personalities, not forgetting the international classics, united by an open-mindedness respectful of tradition, both in the kitchen and in the dining room. In our work, we do not just stare at the strawberries of our own country, but also taste blueberries from the rest of the world, and the compass of our activity points strongly in the direction of French classic cuisine.",
      location: 'Aittatori 4-5, 90100 Oulu',
      imageUri: 'https://via.placeholder.com/300'
    }
  ];

  const filteredRestaurants = selectedCategory === 'All' ? restaurants : restaurants.filter(restaurant => restaurant.price.includes(selectedCategory));

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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedRestaurant && (
              <>
                <Text style={styles.modalTitle}>{selectedRestaurant.name}</Text>                
                <Image
                  style={styles.modalImage}
                  source={{ uri: selectedRestaurant.imageUri }}
                />
                <Text style={styles.modalPrice}>{selectedRestaurant.price}</Text>
                <Text style={styles.modalDescription}>{selectedRestaurant.description}</Text>
                <TouchableOpacity onPress={() => { 
                openMapWithAddress(selectedRestaurant.location);
                closeModal();}}>
                <Text style={styles.modalLocation}>{selectedRestaurant.location}</Text>
                </TouchableOpacity>
                <Button onPress={closeModal} style={styles.closeButton} textColor="#213A5C">Close</Button>
              </>
            )}
          </View>
        </View>
      </Modal>
      <View style={styles.categoriesContainer}>
        {['All', '10-20€', '20-30€', '30-50€'].map(category => (
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
            <Text style={styles.description}>{restaurant.price}</Text>
            <TouchableOpacity onPress={() => openMapWithAddress(restaurant.location)}>
                  <Text style={styles.location}>{restaurant.location}</Text>
              </TouchableOpacity>
          </Card.Content>
          <TouchableOpacity onPress={() => openModal(restaurant)} style={styles.plusButton}>
            <Ionicons name="add-circle" size={24} color="#213A5C" />
          </TouchableOpacity>
        </Card>
      ))}
    </ScrollView>
  );
}  

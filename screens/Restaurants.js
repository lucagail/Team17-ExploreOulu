import React, { useState, useEffect } from 'react';
import { ScrollView, View, Modal, Image, TouchableOpacity } from 'react-native';
import { Card, Title, Text, Button } from 'react-native-paper';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../style/RestaurantsStyle';
import { restaurants } from "../data/restaurantsData.js";
import { doc, setDoc, deleteDoc, collection, onSnapshot } from "firebase/firestore";
import { db, USERS_REF, auth } from '../firebase/Config.js';
import { onAuthStateChanged } from 'firebase/auth';

export default function Restaurants() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [favorites, setFavorites] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const route = useRoute(); 

  const defaultParams = route.params || {}; 
  const [modalVisible, setModalVisible] = useState(defaultParams.modalVisible || false); 
  const [selectedRestaurant, setSelectedRestaurant] = useState(defaultParams.selectedRestaurant || null); 

  useEffect(() => {
    const { params } = route;
    if (params && params.selectedRestaurant) {
      setSelectedRestaurant(params.selectedRestaurant);
      setModalVisible(params.modalVisible);
    }
  }, [route]);

  useEffect(() => {
    let unsubscribe;
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsLoggedIn(true);
          const subColRef = collection(db, USERS_REF, auth.currentUser.uid, 'restaurants');
          unsubscribe = onSnapshot(subColRef, (querySnapshot) => {
            setFavorites(querySnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            })))
          })
          }
          else {
            setIsLoggedIn(false);
            unsubscribe();
          }
        });
        return () => {
          unsubscribe();
        }
      }, []);

  const addToFavorites = async (restaurant) => {
    try {
      if (auth.currentUser) {
        const subColRef = doc(db, USERS_REF, auth.currentUser.uid, 'restaurants', restaurant.id);
        await setDoc(subColRef, {
          id: restaurant.id,
          name: restaurant.name,
          location: restaurant.location,
          image: restaurant.image,
          description: restaurant.description,
          price: restaurant.price
        });
        console.log("Restaurant added to favorites");
      } else {
        console.log("User is not logged in");
      }
    } catch (error) {
      console.error("Error when adding restaurant to favorites", error);
    }
  };

  const removeFromFavorites = async (restaurantId) => {
    try {
      if (auth.currentUser) {
        const subColRef = doc(db, USERS_REF, auth.currentUser.uid, 'restaurants', restaurantId);
        await deleteDoc(subColRef);
        console.log("Restaurant successfully removed from favorites");
      } else {
        console.log("User is not logged in");
      }
    } catch (error) {
      console.error("Error when removing restaurant from favorites", error);
    }
  };

  const isFavorite = (restaurantId) => {
    return favorites.some(favorite => favorite.id === restaurantId);
  };

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

  const filteredRestaurants = selectedCategory === 'All' ? restaurants : restaurants.filter(restaurant => restaurant.price.includes(selectedCategory));

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Ionicons name="arrow-back" size={25} color="#213A5C" />
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
                  source={selectedRestaurant.image}
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
          <Card.Cover source={restaurant.image} />
          <Card.Content>
            <Title style={styles.name}>{restaurant.name}</Title>
            <Text style={styles.description}>{restaurant.price}</Text>
            <TouchableOpacity onPress={() => openMapWithAddress(restaurant.location)}>
                  <Text style={styles.location}>{restaurant.location}</Text>
              </TouchableOpacity>
              <View style={styles.cardFooter}>
              <TouchableOpacity
                onPress={() => {
                  if (isFavorite(restaurant.id)) {
                    removeFromFavorites(restaurant.id);
                  } else {
                    addToFavorites(restaurant);
                  }
                }}
                >
                <Ionicons
                  name={isFavorite(restaurant.id) ? "heart" : "heart-outline"}
                  size={32}
                  color={isFavorite(restaurant.id) ? "red" : "black"}
                />
                </TouchableOpacity>
              <TouchableOpacity onPress={() => openModal(restaurant)} >
                <Ionicons name="add-circle" size={32} color="#213A5C" />
              </TouchableOpacity>
              </View>
          </Card.Content>
          
        </Card>
      ))}
    </ScrollView>
  );
}  

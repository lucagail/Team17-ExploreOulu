import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image } from 'react-native';
import { db, USERS_REF, auth } from '../firebase/Config.js';
import { collection, getDocs, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../style/FavoritesStyle.js';
import { onAuthStateChanged } from 'firebase/auth';


export default function Favorites() {
  const [favoriteHotels, setFavoriteHotels] = useState([]);
  const navigation = useNavigation();
  const [favorites, setFavorites] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const handleBackPress = () => {
    navigation.navigate('Home');
  };

  useEffect(() => {
    let unsubscribe;
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsLoggedIn(true);
        const subColRef = collection(db, USERS_REF, auth.currentUser.uid, 'hotels');
        unsubscribe = onSnapshot(subColRef, (querySnapshot) => {
          setFavoriteHotels(querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })));
        });
      } else {
        setIsLoggedIn(false);
        setFavoriteHotels([]);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);
  

  const handleHotelPress = (hotel) => {
    navigation.navigate('Hotels', { selectedHotel: hotel });
  };

  const removeFromFavorites = async (hotelId) => {
    try {
      if (auth.currentUser) {
        const subColRef = doc(db, USERS_REF, auth.currentUser.uid, 'hotels', hotelId);
        await deleteDoc(subColRef);
        console.log("Hotel successfully removed from favorites");
        setFavoriteHotels(prevFavoriteHotels => prevFavoriteHotels.filter(hotel => hotel.id !== hotelId));
      } else {
        console.log("User is not logged in");
      }
    } catch (error) {
      console.error("Error when removing hotels from favorites", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Ionicons name="arrow-back" size={20} color="#213A5C" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Favorite spots</Text>
      </View>
      {favoriteHotels.length > 0 ? (
        favoriteHotels.map((hotel, index) => (
          <TouchableOpacity key={index} onPress={() => handleHotelPress(hotel)}>
            <View key={index} style={styles.hotelContainer}>
              <Image source={{ uri: hotel.image }} style={styles.hotelImage} />
              <View style={styles.hotelDetails}>
                <Text style={styles.hotelName}>{hotel.name}</Text>
                <Text style={styles.hotelLocation}>{hotel.location}</Text>
              </View>
              <TouchableOpacity onPress={() => removeFromFavorites(hotel.id)} style={styles.removeButton}>
                <Ionicons name="trash-outline" size={24} color="#FF0000" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <View style={styles.noHotelContainer}>
          <Text style={styles.noHotelText}>No favorite hotels found.</Text>
        </View>
      )}
    </ScrollView>
  );
}



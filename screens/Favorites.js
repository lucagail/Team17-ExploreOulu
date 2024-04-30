import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image } from 'react-native';
import { db, USERS_REF, auth } from '../firebase/Config.js';
import { collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../style/FavoritesStyle.js';
import { onAuthStateChanged } from 'firebase/auth';


export default function Favorites() {
  const [favoriteHotels, setFavoriteHotels] = useState([]);
  const [favoriteRestaurants, setFavoriteRestaurants] = useState([]);
  const [favoriteSightseeing, setFavoriteSightseeing] = useState([]);
  const navigation = useNavigation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);


  const handleBackPress = () => {
    navigation.navigate('Home');
  };

  useEffect(() => {
    let unsubscribeHotels;
    let unsubscribeRestaurants;
    let unsubscribeSightseeing;

    const fetchFavorites = async () => {
      try {
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            setIsLoggedIn(true);
            const hotelsSubColRef = collection(db, USERS_REF, auth.currentUser.uid, 'hotels');
            const restaurantsSubColRef = collection(db, USERS_REF, auth.currentUser.uid, 'restaurants');
            const sightseeingSubColRef = collection(db, USERS_REF, auth.currentUser.uid, 'sightseeing');
            unsubscribeHotels = onSnapshot(hotelsSubColRef, (hotelsQuerySnapshot) => {
              const hotels = hotelsQuerySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
              }));
              setFavoriteHotels(hotels);
            });

            unsubscribeRestaurants = onSnapshot(restaurantsSubColRef, (restaurantsQuerySnapshot) => {
              const restaurants = restaurantsQuerySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
              }));
              setFavoriteRestaurants(restaurants);
            });
            unsubscribeSightseeing = onSnapshot(sightseeingSubColRef, (sightseeingQuerySnapshot) => {
              const sightseeing = sightseeingQuerySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
              }));
              setFavoriteSightseeing(sightseeing);
            });
          } else {
            setIsLoggedIn(false);
            setFavoriteHotels([]);
            setFavoriteRestaurants([]);
            setFavoriteSightseeing([]);
          }
        });
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();

    return () => {
      unsubscribeHotels && unsubscribeHotels();
      unsubscribeRestaurants && unsubscribeRestaurants();
      unsubscribeSightseeing && unsubscribeSightseeing();
    };
  }, []);

  const handleHotelPress = (hotel) => {
    navigation.navigate('Hotels', { modalVisible: true, selectedHotel: hotel });
  };
  
  const handleRestaurantPress = (restaurant) => {
    navigation.navigate('Restaurants', { modalVisible: true, selectedRestaurant: restaurant });
  };
  
  const handleSightseeingPress = (sightseeing) => {
    navigation.navigate('Sightseeing', { modalVisible: true, selectedCard: sightseeing });
  };

  const removeFromFavorites = async (itemId, itemType) => {
    try {
      if (auth.currentUser) {
        let subColRef;
        switch (itemType) {
          case 'hotel':
            subColRef = doc(db, USERS_REF, auth.currentUser.uid, 'hotels', itemId);
            await deleteDoc(subColRef);
            setFavoriteHotels(prevFavoriteHotels => prevFavoriteHotels.filter(hotel => hotel.id !== itemId));
            break;
          case 'restaurant':
            subColRef = doc(db, USERS_REF, auth.currentUser.uid, 'restaurants', itemId);
            await deleteDoc(subColRef);
            setFavoriteRestaurants(prevFavoriteRestaurants => prevFavoriteRestaurants.filter(restaurant => restaurant.id !== itemId));
            break;
          case 'sightseeing':
            subColRef = doc(db, USERS_REF, auth.currentUser.uid, 'sightseeing', itemId);
            await deleteDoc(subColRef);
            setFavoriteSightseeing(prevFavoriteSightseeing => prevFavoriteSightseeing.filter(sightseeing => sightseeing.id !== itemId));
            break;
          default:
            console.error('Invalid itemType');
            break;
        }
        console.log(`${itemType} successfully removed from favorites`);
      } else {
        console.log("User is not logged in");
      }
    } catch (error) {
      console.error(`Error when removing ${itemType} from favorites`, error);
    }
  };
  

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Ionicons name="arrow-back" size={25} color="#213A5C" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Favorite spots</Text>
      </View>
      {(favoriteHotels.length > 0 || favoriteRestaurants.length > 0 || favoriteSightseeing.length > 0) ? (
        <>
          {favoriteHotels.length > 0 && (
            <>
              <Text style={styles.subtitle}>Hotels</Text>
              {favoriteHotels.map((hotel, index) => (
                <TouchableOpacity key={index} onPress={() => handleHotelPress(hotel)}>
                  <View style={styles.hotelContainer}>
                    <Image source={hotel.image} style={styles.hotelImage} />
                    <View style={styles.hotelDetails}>
                      <Text style={styles.hotelName}>{hotel.name}</Text>
                      <Text style={styles.hotelLocation}>{hotel.location}</Text>
                    </View>
                    <TouchableOpacity onPress={() => removeFromFavorites(hotel.id, 'hotel')} style={styles.removeButton}>
                      <Ionicons name="trash-outline" size={30} color="#FF0000" />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
            </>
          )}
          {favoriteRestaurants.length > 0 && (
            <>
              <Text style={styles.subtitle}>Restaurants</Text>
              {favoriteRestaurants.map((restaurant, index) => (
                <TouchableOpacity key={index} onPress={() => handleRestaurantPress(restaurant)}>
                  <View style={styles.hotelContainer}>
                    <Image source={restaurant.image} style={styles.hotelImage} />
                    <View style={styles.hotelDetails}>
                      <Text style={styles.hotelName}>{restaurant.name}</Text>
                      <Text style={styles.hotelLocation}>{restaurant.location}</Text>
                    </View>
                    <TouchableOpacity onPress={() => removeFromFavorites(restaurant.id, 'restaurant')} style={styles.removeButton}>
                      <Ionicons name="trash-outline" size={30} color="#FF0000" />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
            </>
          )}
          {favoriteSightseeing.length > 0 && (
            <>
              <Text style={styles.subtitle}>Sightseeing</Text>
              {favoriteSightseeing.map((sightseeing, index) => (
                <TouchableOpacity key={index} onPress={() => handleSightseeingPress(sightseeing)}>
                  <View style={styles.hotelContainer}>
                    <Image source={sightseeing.image} style={styles.hotelImage} />
                    <View style={styles.hotelDetails}>
                      <Text style={styles.hotelName}>{sightseeing.name}</Text>
                      <Text style={styles.hotelLocation}>{sightseeing.location}</Text>
                    </View>
                    <TouchableOpacity onPress={() => removeFromFavorites(sightseeing.id, 'sightseeing')} style={styles.removeButton}>
                      <Ionicons name="trash-outline" size={30} color="#FF0000" />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
            </>
          )}
        </>
      ) : (
        <View style={styles.noHotelContainer}>
          <Text style={styles.noHotelText}>No favorite items found.</Text>
        </View>
      )}
    </ScrollView>
  );
      }  
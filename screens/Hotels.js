import React, { useState, useEffect } from 'react';
import { ScrollView, View, Modal, Image, TouchableOpacity, Linking } from 'react-native';
import { Card, Title, Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { db, USERS_REF, auth } from '../firebase/Config.js';
import { Ionicons } from '@expo/vector-icons';
import styles from '../style/HotelsStyle';
import { doc, setDoc, deleteDoc, getDocs, collection, onSnapshot, query } from "firebase/firestore";
import { onAuthStateChanged } from 'firebase/auth';

export default function Hotels() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    let unsubscribe;
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsLoggedIn(true);
          const subColRef = collection(db, USERS_REF, auth.currentUser.uid, 'hotels');
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
  

  const addToFavorites = async (hotel) => {
    try {
      if (auth.currentUser) {
        const subColRef = doc(db, USERS_REF, auth.currentUser.uid, 'hotels', hotel.id);
        await setDoc(subColRef, {
          id: hotel.id,
          name: hotel.name,
          location: hotel.location,
          image: hotel.imageUri
        });
        console.log("Hotel added removed from favorites");
      } else {
        console.log("User is not logged in");
      }
    } catch (error) {
      console.error("Error when adding hotels from favorites", error);
    }
  };

  const removeFromFavorites = async (hotelId) => {
    try {
        const subColRef = doc(db, USERS_REF, auth.currentUser.uid, 'hotels', hotelId);
        await deleteDoc(subColRef);
        console.log("Hotel successfully removed from favorites");
      } catch (error) {
        console.log("User is not logged in");
      }
  }

  const isFavorite = (hotelId) => {
    return favorites.some(favorite => favorite.id === hotelId);
  };
  

  const handleBackPress = () => {
    navigation.navigate('Home');
  };

  const handleGoToHotel = () => {
    if (selectedHotel && selectedHotel.url) {
      Linking.openURL(selectedHotel.url);
    }
  };

  const openModal = (hotel) => {
    setSelectedHotel(hotel);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const openMapWithAddress = (location) => {
    navigation.navigate('Map', { location });
  };
  
  const hotels = [
    {
      id: 'hotel1',
      name: 'Raddison Blue',
      description: "The Radisson Blu Hotel in Oulu offers its guests modern comfort and first-class service in the heart of the bustling city. With its stylishly furnished rooms, exquisite restaurants, and extensive conference facilities, the hotel is the ideal choice for both business travelers and holidaymakers alike. Enjoy the prime location near attractions such as the marketplace and the city centre, or relax in the hotel's wellness area after a busy day.",
      location: 'Hallituskatu 1, 90100 Oulu',
      imageUri: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQQZA8s3i80S9sJnQwPMBucnYOuPjOsPWuuWKP272agfS60vRU_0o1Vzv_6W03OySwua1OyWOjO2wlK9hVL2lzOgQ',
      url: 'https://www.radissonhotels.com/fi-fi/hotellit/radisson-blu-oulu',
      coordinates: { latitude: 65.0121, longitude: 25.4689 }
    },
    {
      id: 'hotel2',
      name: 'Lapland Hotels',
      description: "The Lapland Hotel in Oulu combines the charm of the North with modern comfort and hospitality. The cozy rooms and suites of the hotel offer a welcoming atmosphere and a magnificent view of the city or the surrounding countryside. With its excellent restaurant, sauna, and fitness centre, the Lapland Hotel is the ideal starting point for exploring the nature of Lapland or for business travellers who want to relax after a stressful day.",
      location: 'Kirkkokatu 3, 90100 Oulu',
      imageUri: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQQZA8s3i80S9sJnQwPMBucnYOuPjOsPWuuWKP272agfS60vRU_0o1Vzv_6W03OySwua1OyWOjO2wlK9hVL2lzOgQ',
      url: 'https://www.laplandhotels.com/EN/urban-hotels/oulu/lapland-hotels-oulu.html',
      coordinates: { latitude: 65.0131, longitude: 25.4727 }
    },
    {
      id: 'hotel3',
      name: 'Best Western Hotel Apollo',
      description: "The Lapland Hotel in Oulu combines the charm of the North with modern comfort and hospitality. The cozy rooms and suites of the hotel offer a welcoming atmosphere and a magnificent view of the city or the surrounding countryside. With its excellent restaurant, sauna, and fitness centre, the Lapland Hotel is the ideal starting point for exploring the nature of Lapland or for business travellers who want to relax after a stressful day.",
      location: 'Asemakatu 31-33, 90100 Oulu',
      imageUri: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQQZA8s3i80S9sJnQwPMBucnYOuPjOsPWuuWKP272agfS60vRU_0o1Vzv_6W03OySwua1OyWOjO2wlK9hVL2lzOgQ',
      url: 'https://www.bestwestern.com/en_US/book/hotel-details.91081.html?aff=BFI&cid=&ssob=BFI&checkIn=2024-04-02&checkOut=2024-04-03&rooms=1&adults=1',
      coordinates: { latitude: 65.0123, longitude: 25.4774 }
    },
    {
      id: 'hotel4',
      name: 'Green Star Hotel',
      description: "The Green Star Hotel in Oulu is an eco-friendly accommodation that combines modern comfort with sustainability. The rooms and suites of the hotel are stylishly furnished and offer a relaxing retreat for guests who want to explore nature and the surroundings. With its focus on environmental protection and sustainability, the Green Star Hotel not only offers its guests a pleasant stay but also the opportunity to make a positive contribution to environmental protection.",
      location: 'Uusikatu 26, 90100 Oulu',
      imageUri: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQQZA8s3i80S9sJnQwPMBucnYOuPjOsPWuuWKP272agfS60vRU_0o1Vzv_6W03OySwua1OyWOjO2wlK9hVL2lzOgQ',
      url: 'hhttps://www.greenstar.fi/en/hotels/greenstar-hotel-oulu-en/',
      coordinates: { latitude: 65.0142, longitude: 25.4788 }
    },
  
  ];
  

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Ionicons name="arrow-back" size={20} color="#213A5C" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Hotels</Text>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedHotel && (
              <>
                <Text style={styles.modalTitle}>{selectedHotel.name}</Text>
                <Image
                  style={styles.modalImage}
                  source={{ uri: selectedHotel.imageUri }}
                />
                <Text style={styles.modalDescription}>{selectedHotel.description}</Text>
                <TouchableOpacity onPress={() => { 
                openMapWithAddress(selectedHotel.location);
                closeModal();}}>
                <Text style={styles.modalLocation}>{selectedHotel.location}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleGoToHotel} style={styles.button}>
                  <Text style={styles.buttonText}>Book now!</Text>
                </TouchableOpacity>
                <Button onPress={closeModal} style={styles.closeButton} textColor="#213A5C">Close</Button>
              </>
            )}
          </View>
        </View>
      </Modal>
      <View style={styles.cardContainer}>
      {hotels.map((card, index) => (
        <View key={index} style={styles.cardItem}>
          <Card style={styles.card}>
            <Card.Cover source={{ uri: card.imageUri }} />
            <Card.Content>
              <Title style={styles.title}>{card.name}</Title>
              <TouchableOpacity onPress={() => openMapWithAddress(card.location)}>
                  <Text style={styles.location}>{card.location}</Text>
              </TouchableOpacity>
              <View style={styles.cardFooter}>
                  
                  <TouchableOpacity
                    onPress={() => {
                      if (isFavorite(card.id)) {
                        removeFromFavorites(card.id);
                      } else {
                        addToFavorites(card);
                      }
                    }}
                    style={styles.favoriteButton}>
                    <Ionicons name={isFavorite(card.id) ? "heart" : "heart-outline"} size={30} color={isFavorite(card.id) ? "red" : "black"} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => openModal(card)}>
                  <Ionicons name="add-circle" size={30} color="#213A5C" />
                    </TouchableOpacity>
                </View>
              </Card.Content>
            </Card>
          </View>
      ))}
      </View>

    </ScrollView>
  );
}

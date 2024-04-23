import React, { useState, useEffect } from 'react';
import { ScrollView, View, Modal, Image, TouchableOpacity, Linking } from 'react-native';
import { Card, Title, Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { db, USERS_REF, auth } from '../firebase/Config.js';
import { Ionicons } from '@expo/vector-icons';
import styles from '../style/HotelsStyle';
import { doc, setDoc, deleteDoc, getDocs, collection, onSnapshot, query } from "firebase/firestore";
import { onAuthStateChanged } from 'firebase/auth';
import { hotels } from "../data/hotelsData.js";

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
          image: hotel.image
        });
        console.log("Hotel added to favorites");
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
                  source={ selectedHotel.image }
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
            <Card.Cover source={card.image } />
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
                    >
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

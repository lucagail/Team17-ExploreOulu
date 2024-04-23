import React, { useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity, View, Modal, Image } from 'react-native';
import { Card, Title, Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../style/SightseeingStyle';
import {sightseeing} from "../data/sightseeingData.js";
import { doc, setDoc, deleteDoc, collection, onSnapshot } from "firebase/firestore";
import { db, USERS_REF, auth } from '../firebase/Config.js';
import { onAuthStateChanged } from 'firebase/auth';

export default function Sightseeing() {

  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    let unsubscribe;
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsLoggedIn(true);
          const subColRef = collection(db, USERS_REF, auth.currentUser.uid, 'sightseeing');
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

  const addToFavorites = async (sightseeing) => {
    try {
      if (auth.currentUser) {
        const subColRef = doc(db, USERS_REF, auth.currentUser.uid, 'sightseeing', sightseeing.id);
        await setDoc(subColRef, {
          id: sightseeing.id,
          name: sightseeing.name,
          location: sightseeing.location,
          image: sightseeing.image
        });
        console.log("Sightseeing added to favorites");
      } else {
        console.log("User is not logged in");
      }
    } catch (error) {
      console.error("Error when adding sightseeing to favorites", error);
    }
  };

  const removeFromFavorites = async (sightseeingId) => {
    try {
      if (auth.currentUser) {
        const subColRef = doc(db, USERS_REF, auth.currentUser.uid, 'sightseeing', sightseeingId);
        await deleteDoc(subColRef);
        console.log("Sightseeing successfully removed from favorites");
      } else {
        console.log("User is not logged in");
      }
    } catch (error) {
      console.error("Error when removing sightseeing from favorites", error);
    }
  };

  const isFavorite = (sightseeingId) => {
    return favorites.some(favorite => favorite.id === sightseeingId);
  };

  const handleBackPress = () => {
    navigation.navigate('Home');
  };

  const openModal = (card) => {
    setSelectedCard(card);
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
        <Text style={styles.title}>Sightseeing</Text>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedCard && (
              <>
              <Text style={styles.modalTitle}>{selectedCard.name}</Text>
                <Image
                  style={styles.modalImage}
                  source={selectedCard.image}
                />
                <Text style={styles.modalDescription}>{selectedCard.description}</Text>
                <TouchableOpacity onPress={() => { 
                openMapWithAddress(selectedCard.location);
                closeModal();}}>
                <Text style={styles.modalLocation}>{selectedCard.location}</Text>
                </TouchableOpacity>
                <Button onPress={closeModal} style={styles.closeButton} textColor="#213A5C">Close</Button>
              </>
            )}
          </View>
        </View>
      </Modal>
      <View style={styles.cardContainer}>
      {sightseeing.map((sightseeing, index) => (
        <View key={index} style={styles.cardItem}>
          <Card style={styles.card}>
            <Card.Cover source={sightseeing.image}/>
            <Card.Content>
              <Title style={styles.title}>{sightseeing.name}</Title>
              <TouchableOpacity onPress={() => openMapWithAddress(sightseeing.location)}>
                  <Text style={styles.location}>{sightseeing.location}</Text>
              </TouchableOpacity>
              <View style={styles.cardFooter}>
              <TouchableOpacity
                onPress={() => {
                  if (isFavorite(sightseeing.id)) {
                    removeFromFavorites(sightseeing.id);
                  } else {
                    addToFavorites(sightseeing);
                  }
                }}
                >
                <Ionicons
                  name={isFavorite(sightseeing.id) ? "heart" : "heart-outline"}
                  size={30}
                  color={isFavorite(sightseeing.id) ? "red" : "black"}
                />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => openModal(sightseeing)} >
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


import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, View, Modal, Image } from 'react-native';
import { Card, Title, Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../style/SightseeingStyle';
import sightseeingData from "../data/sightseeingData.json";
export default function Sightseeing() {

  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const sightseeing = sightseeingData;


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
                  source={selectedCard.imageUri}
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
      {sightseeingData.sightseeing.map((sightseeing, index) => (
        <View key={index} style={styles.cardItem}>
          <Card style={styles.card}>
            <Card.Cover source={{uri:sightseeing.imageUri}} style={styles.cardImage}/>
            <Card.Content>
              <Title style={styles.title}>{sightseeing.name}</Title>
              <TouchableOpacity onPress={() => openMapWithAddress(sightseeing.location)}>
                  <Text style={styles.location}>{sightseeing.location}</Text>
              </TouchableOpacity>
              <View style={styles.cardFooter}>
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


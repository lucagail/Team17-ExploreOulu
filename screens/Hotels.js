import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Modal, Image, TouchableOpacity, Linking } from 'react-native';
import { Card, Title, Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function Hotels() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);

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
        <Text style={styles.title}>Sightseeing</Text>
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
                <Text style={styles.modalTitle}>{selectedHotel.title}</Text>
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
              <Title style={styles.title}>{card.title}</Title>
              <TouchableOpacity onPress={() => openMapWithAddress(card.location)}>
                  <Text style={styles.location}>{card.location}</Text>
              </TouchableOpacity>

            </Card.Content>
          </Card>
          <TouchableOpacity onPress={() => openModal(card)} style={styles.plusButton}>
            <Ionicons name="add-circle" size={24} color="#213A5C" />
          </TouchableOpacity>
        </View>
      ))}
      </View>

    </ScrollView>
  );
}

const hotels = [
  {
    title: 'Raddison Blue',
    description: "The Radisson Blu Hotel in Oulu offers its guests modern comfort and first-class service in the heart of the bustling city. With its stylishly furnished rooms, exquisite restaurants, and extensive conference facilities, the hotel is the ideal choice for both business travelers and holidaymakers alike. Enjoy the prime location near attractions such as the marketplace and the city centre, or relax in the hotel's wellness area after a busy day.",
    location: 'Hallituskatu 1, 90100 Oulu',
    imageUri: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQQZA8s3i80S9sJnQwPMBucnYOuPjOsPWuuWKP272agfS60vRU_0o1Vzv_6W03OySwua1OyWOjO2wlK9hVL2lzOgQ',
    url: 'https://www.radissonhotels.com/fi-fi/hotellit/radisson-blu-oulu',
    coordinates: { latitude: 65.0121, longitude: 25.4689 }
  },
  {
    title: 'Lapland Hotels',
    description: "The Lapland Hotel in Oulu combines the charm of the North with modern comfort and hospitality. The cozy rooms and suites of the hotel offer a welcoming atmosphere and a magnificent view of the city or the surrounding countryside. With its excellent restaurant, sauna, and fitness centre, the Lapland Hotel is the ideal starting point for exploring the nature of Lapland or for business travellers who want to relax after a stressful day.",
    location: 'Kirkkokatu 3, 90100 Oulu',
    imageUri: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQQZA8s3i80S9sJnQwPMBucnYOuPjOsPWuuWKP272agfS60vRU_0o1Vzv_6W03OySwua1OyWOjO2wlK9hVL2lzOgQ',
    url: 'https://www.laplandhotels.com/EN/urban-hotels/oulu/lapland-hotels-oulu.html',
    coordinates: { latitude: 65.0131, longitude: 25.4727 }
  },
  {
    title: 'Best Western Hotel Apollo',
    description: "The Lapland Hotel in Oulu combines the charm of the North with modern comfort and hospitality. The cozy rooms and suites of the hotel offer a welcoming atmosphere and a magnificent view of the city or the surrounding countryside. With its excellent restaurant, sauna, and fitness centre, the Lapland Hotel is the ideal starting point for exploring the nature of Lapland or for business travellers who want to relax after a stressful day.",
    location: 'Asemakatu 31-33, 90100 Oulu',
    imageUri: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQQZA8s3i80S9sJnQwPMBucnYOuPjOsPWuuWKP272agfS60vRU_0o1Vzv_6W03OySwua1OyWOjO2wlK9hVL2lzOgQ',
    url: 'https://www.bestwestern.com/en_US/book/hotel-details.91081.html?aff=BFI&cid=&ssob=BFI&checkIn=2024-04-02&checkOut=2024-04-03&rooms=1&adults=1',
    coordinates: { latitude: 65.0123, longitude: 25.4774 }
  },
  {
    title: 'Green Star Hotel',
    description: "The Green Star Hotel in Oulu is an eco-friendly accommodation that combines modern comfort with sustainability. The rooms and suites of the hotel are stylishly furnished and offer a relaxing retreat for guests who want to explore nature and the surroundings. With its focus on environmental protection and sustainability, the Green Star Hotel not only offers its guests a pleasant stay but also the opportunity to make a positive contribution to environmental protection.",
    location: 'Uusikatu 26, 90100 Oulu',
    imageUri: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQQZA8s3i80S9sJnQwPMBucnYOuPjOsPWuuWKP272agfS60vRU_0o1Vzv_6W03OySwua1OyWOjO2wlK9hVL2lzOgQ',
    url: 'hhttps://www.greenstar.fi/en/hotels/greenstar-hotel-oulu-en/',
    coordinates: { latitude: 65.0142, longitude: 25.4788 }
  },

];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  cardContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20
  },
  card: {
    marginBottom: 20,
  },
  location: {
    fontStyle: 'italic',
    fontSize: 16,
    marginTop: 8,
    textAlign: 'right'
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#213A5C',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    width: '80%'
  },
  modalImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 10
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#213A5C'
  },
  modalLocation: {
    fontStyle: 'italic',
    fontSize: 14,
    marginBottom: 5,
    textAlign: 'right'
  },
  modalDescription: {
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'justify'
  },
  closeButton: {
    marginTop: 10,
  },
  cardItem: {
    marginBottom: 20,
    position: 'relative',
  },
  plusButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    elevation: 4,
    zIndex: 1,
    padding: 5
  },
  button: {
    backgroundColor: '#213A5C',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 20 
  },
  buttonText: {
    color: '#D6C9B6',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

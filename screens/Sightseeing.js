import React, { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View, Modal, Image } from 'react-native';
import { Card, Title, Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function Sightseeing() {

  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

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
      { /* Modal for showing more details */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedCard && (
              <>
              <Text style={styles.modalTitle}>{selectedCard.title}</Text>
                <Image
                  style={styles.modalImage}
                  source={{ uri: selectedCard.imageUri }}
                />
                
                
                <Text style={styles.modalDescription}>{selectedCard.description}</Text>
                <Text style={styles.modalLocation}>{selectedCard.location}</Text>
                <Button onPress={closeModal} style={styles.closeButton} textColor="#213A5C">Close</Button>
              </>
            )}
          </View>
        </View>
      </Modal>
      { /* Cards */}
      <View style={styles.cardContainer}>
      {cards.map((card, index) => (
        <View key={index} style={styles.cardItem}>
          <Card style={styles.card}>
            <Card.Cover source={{ uri: card.imageUri }} />
            <Card.Content>
              <Title style={styles.title}>{card.title}</Title>
              <Text style={styles.location}>{card.location}</Text>
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

const cards = [
  {
    title: 'Market Square and Surroundings',
    description: 'The Market Square of Oulu is the heart of the city. Locals and visitors alike gather here to buy local products in the market hall, experience traditional markets, or simply enjoy the bustling atmosphere. Surrounded by historic buildings and cozy cafes, the market square provides a picturesque setting for a leisurely stroll or a coffee outdoors. The market activity is overseen by the Policeman, a large statue serving as a meeting point and one of the most popular photo spots.',
    location: 'Address: Kauppatori, 90100 Oulu',
    imageUri: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQQZA8s3i80S9sJnQwPMBucnYOuPjOsPWuuWKP272agfS60vRU_0o1Vzv_6W03OySwua1OyWOjO2wlK9hVL2lzOgQ'
  },
  {
    title: 'Pikisaari',
    description: 'Pikisaari, a charming island off the coast of Oulu, is a true gem that enchants visitors with its traditional houses and a Finnish restaurant called "Sokeri-Jussin Kievari". Once a centre for boat building, the oldest wooden house in the city, built between 1737 and 1739, is now a small museum. Many artists and craftsmen have settled in this neighbourhood.',
    location: 'Address: Pikisaari, 90100 Oulu',
    imageUri: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQQZA8s3i80S9sJnQwPMBucnYOuPjOsPWuuWKP272agfS60vRU_0o1Vzv_6W03OySwua1OyWOjO2wlK9hVL2lzOgQ'
  },
  {
    title: 'Hailuoto',
    description: 'Just 7km off the coast lies the island of Hailuoto, the largest in the Gulf of Bothnia, measuring 25km in length and 15km in width. Those seeking peace and relaxation and have enough time should take the free car ferry there: small fishing villages, thatched wooden houses, old windmills, art shops, sandy beaches, and a diverse birdlife await explorers. In winter, there is an ice road to the island.',
    location: 'Address: Hailuoto, 90480 Finland',
    imageUri: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQQZA8s3i80S9sJnQwPMBucnYOuPjOsPWuuWKP272agfS60vRU_0o1Vzv_6W03OySwua1OyWOjO2wlK9hVL2lzOgQ'
  },
  {
    title: 'Car Museum',
    description: 'The Oulu Car Museum is a must-visit for all car enthusiasts and tech lovers. Here, visitors can admire a fascinating collection of about 50 historic vehicles, from classic cars to rare specimens – the oldest dating back to 1910.',
    location: 'Address: Automuseontie 3, 90410 Oulu',
    imageUri: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQQZA8s3i80S9sJnQwPMBucnYOuPjOsPWuuWKP272agfS60vRU_0o1Vzv_6W03OySwua1OyWOjO2wlK9hVL2lzOgQ'
  },
  {
    title: 'Nalikari Beach',
    description: 'Nallikari Beach is the perfect place to escape the hectic city life and experience the natural beauty of the Finnish coast. With its fine sand, clear water, and breathtaking sunsets, the beach is a popular destination for sunbathers, swimmers, and water sports enthusiasts. Along the coast, there are also two cozy beach cafes and activities for the whole family.',
    location: 'Address: Nallikarinranta, 90500 Oulu',
    imageUri: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQQZA8s3i80S9sJnQwPMBucnYOuPjOsPWuuWKP272agfS60vRU_0o1Vzv_6W03OySwua1OyWOjO2wlK9hVL2lzOgQ'
  },
  {
    title: 'Castle',
    description: 'North of the Hupisaaret City Park, the Oulujoki river flows through a labyrinth of smaller islands, all connected by bridges to each other and to the city. In the midst of the river section called Kosikeskus lies the small island of Linnansaari, where one can see the scant remains of the castle destroyed in the 18th century. It was built in 1590 on the island of Linnansaari for protection against the Russians and renewed under Karl IX.',
    location: 'Address: Linnansaari 1, 90100 Oulu',
    imageUri: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQQZA8s3i80S9sJnQwPMBucnYOuPjOsPWuuWKP272agfS60vRU_0o1Vzv_6W03OySwua1OyWOjO2wlK9hVL2lzOgQ'
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
    marginBottom: 10,
    textAlign: 'right'
  },
  modalDescription: {
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'justify'
  },
  closeButton: {
    marginTop: 10
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
  }
});

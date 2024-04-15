import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, View, Modal, Image } from 'react-native';
import { Card, Title, Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../style/SightseeingStyle';


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

  const openMapWithAddress = (location) => {
    navigation.navigate('Map', { location });
  };
  const cards = [
    {
      name: 'Market Square and Surroundings',
      description: 'The Market Square of Oulu is the heart of the city. Locals and visitors alike gather here to buy local products in the market hall, experience traditional markets, or simply enjoy the bustling atmosphere. Surrounded by historic buildings and cozy cafes, the market square provides a picturesque setting for a leisurely stroll or a coffee outdoors. The market activity is overseen by the Policeman, a large statue serving as a meeting point and one of the most popular photo spots.',
      location: 'Kauppatori, 90100 Oulu',
      imageUri: require('../images/Kauppahalli2.jpeg')
    },
    {
      name: 'Pikisaari',
      description: 'Pikisaari, a charming island off the coast of Oulu, is a true gem that enchants visitors with its traditional houses and a Finnish restaurant called "Sokeri-Jussin Kievari". Once a centre for boat building, the oldest wooden house in the city, built between 1737 and 1739, is now a small museum. Many artists and craftsmen have settled in this neighbourhood.',
      location: 'Pikisaari, 90100 Oulu',
      imageUri: require('../images/Pikisaari.jpeg')  
    },
    {
      name: 'Hailuoto',
      description: 'Just 7km off the coast lies the island of Hailuoto, the largest in the Gulf of Bothnia, measuring 25km in length and 15km in width. Those seeking peace and relaxation and have enough time should take the free car ferry there: small fishing villages, thatched wooden houses, old windmills, art shops, sandy beaches, and a diverse birdlife await explorers. In winter, there is an ice road to the island.',
      location: 'Hailuoto, 90480 Finland',
      imageUri: require('../images/Hailuoto.jpeg')  
    },
    {
      name: 'Car Museum',
      description: 'The Oulu Car Museum is a must-visit for all car enthusiasts and tech lovers. Here, visitors can admire a fascinating collection of about 50 historic vehicles, from classic cars to rare specimens – the oldest dating back to 1910.',
      location: 'Automuseontie 3, 90410 Oulu',
      imageUri: require('../images/Kauppahalli2.jpeg')  
    },
    {
      name: 'Nalikari Beach',
      description: 'Nallikari Beach is the perfect place to escape the hectic city life and experience the natural beauty of the Finnish coast. With its fine sand, clear water, and breathtaking sunsets, the beach is a popular destination for sunbathers, swimmers, and water sports enthusiasts. Along the coast, there are also two cozy beach cafes and activities for the whole family.',
      location: 'Nallikarinranta, 90500 Oulu',
      imageUri: require('../images/Nallikari3.jpeg')  
    },
    {
      name: 'Castle',
      description: 'North of the Hupisaaret City Park, the Oulujoki river flows through a labyrinth of smaller islands, all connected by bridges to each other and to the city. In the midst of the river section called Kosikeskus lies the small island of Linnansaari, where one can see the scant remains of the castle destroyed in the 18th century. It was built in 1590 on the island of Linnansaari for protection against the Russians and renewed under Karl IX.',
      location: 'Linnansaari 1, 90100 Oulu',
      imageUri: require('../images/Kauppahalli2.jpeg')  
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
      {cards.map((card, index) => (
        <View key={index} style={styles.cardItem}>
          <Card style={styles.card}>
            <Card.Cover source={card.imageUri} style={styles.cardImage} />
            <Card.Content>
              <Title style={styles.title}>{card.name}</Title>
              <TouchableOpacity onPress={() => openMapWithAddress(card.location)}>
                  <Text style={styles.location}>{card.location}</Text>
              </TouchableOpacity>
              <View style={styles.cardFooter}>
              <TouchableOpacity onPress={() => openModal(card)} >
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


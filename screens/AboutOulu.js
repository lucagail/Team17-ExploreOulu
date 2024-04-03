import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const AboutOulu = () => {

  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.navigate('Home');
  };

  return (
    <ScrollView style = {styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Ionicons name="arrow-back" size={20} color="#213A5C" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>About Oulu</Text>
      </View>
       <View style={styles.imageSection}>
        <View style={styles.sliderContainer}>
          <Swiper style={styles.wrapper} showsButtons={true}>
            <View style={styles.slide}>
              <Image source={require('/Users/lucagail/Team17-ExploreOulu/assets/Oulu_1.jpg')} style={styles.image} />
            </View>
            <View style={styles.slide}>
              <Image source={require('/Users/lucagail/Team17-ExploreOulu/assets/Oulu_1.jpg')} style={styles.image} />
            </View>
            <View style={styles.slide}>
              <Image source={require('/Users/lucagail/Team17-ExploreOulu/assets/Oulu_1.jpg')} style={styles.image} />
            </View>
          </Swiper>
        </View>
      </View>
      <View style={styles.header2}>
        <Text style={styles.title}>Über Oulu</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Geschichte von Oulu</Text>
        <Text style={styles.sectionText}>Oulu hat eine lange und faszinierende Geschichte...</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Geografie und Lage</Text>
        <Text style={styles.sectionText}>Oulu liegt am Bottnischen Meerbusen im Norden Finnlands...</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Kultur und Traditionen</Text>
        <Text style={styles.sectionText}>Die Kultur von Oulu ist geprägt von...</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Architektur und Sehenswürdigkeiten</Text>
        <Text style={styles.sectionText}>Oulu beherbergt eine Vielzahl beeindruckender...</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Schlusswort</Text>
        <Text style={styles.sectionText}>Entdecken Sie die Wunder von Oulu...</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#213A5C',
  },
  header2: {
   
    paddingVertical: 20,
    alignItems: 'center',
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 15,
    borderRadius: 10,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 22,
  },
  imageSection: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 15,
    borderRadius: 10,
    elevation: 3,
  },
  sliderContainer: {
    height: 200, // Höhe des Sliders
    borderRadius: 10,
    overflow: 'hidden', // Verhindert, dass Bilder über den Container hinausragen
  },
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
});

export default AboutOulu;

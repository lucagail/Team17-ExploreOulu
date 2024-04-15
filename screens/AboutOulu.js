import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styles from '../style/AboutOuluStyle.js';

const AboutOulu = () => {

const navigation = useNavigation();

const handleBackPress = () => {
  navigation.navigate('Home');
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
      <Text style={styles.title}>About Oulu</Text>
    </View>
    <View style={styles.imageSection}>
      <View style={styles.sliderContainer}>
        <Swiper style={styles.wrapper} showsButtons={true} activeDotColor="#D6C9B6" dotColor="#213A5C" 
                   prevButton={<Ionicons name="arrow-back" size={30} color="#213A5C" />} nextButton={<Ionicons name="arrow-forward" size={30} color="#213A5C"
                   />} autoplay={true}>
          <View style={styles.slide}>
          <Image source={require('../images/AboutOulu2.jpeg')} style={styles.image} />
          </View>
          <View style={styles.slide}>
          <Image source={require('../images/AboutOuluHistory.jpeg')} style={styles.image} />
          </View>
          <View style={styles.slide}>
          <Image source={require('../images/AboutOuluKanu.jpeg')} style={styles.image} />
          </View>
        </Swiper>
      </View>
    </View>
    <View style={styles.section}>
      <Text style={styles.sectionText}>With a population of 209,000, Oulu is the largest city in Northern Finland, the fifth largest city
           in the country and the northernmost major city in the European Union. With an average age of
           36 years, Oulu is one of the youngest cities in Europe. It is also known for the world
           championship in air guitar playing.</Text>
     <Text style={styles.subheader}>History of Oulu</Text>
     <Text style={styles.sectionText}>Oulu has been able to call itself a city for well over 400 years, but its history as a market town
           dates back to the Middle Ages. At that time, tar produced in the primeval forests was brought
           by boat to the mouth of the Oulujoki and shipped here. This ancient trade later developed into
           the economic mainstay of Oulu, which became one of the world's largest tar export harbours in
           the 18th and 19th centuries. It's hard to believe that the great wars of the Napoleonic era were
           crucially dependent on this material from the northern Finnish forests and that, in this respect
           at least, Oulu helped to write a little world history.
           After the last major fire in 1822, Oulu was rebuilt in a modern style according to plans by C. L.
           Engel and continued to develop at a rapid pace - even after the heyday of tea exports. From
           1959, industry and trade were joined by universities and research and technology centres, so
           that Oulu will probably continue to play a traditional role as an intellectual focal point in
           Northern Finland in the future. And preparations are already underway for Oulu to become the
           European Capital of Culture in 2026.</Text>
    </View>
  </ScrollView>
);};
export default AboutOulu;
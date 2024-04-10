import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styles from '../style/AboutOuluStyle';

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
            <Image source={{ uri: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQQZA8s3i80S9sJnQwPMBucnYOuPjOsPWuuWKP272agfS60vRU_0o1Vzv_6W03OySwua1OyWOjO2wlK9hVL2lzOgQ' }} style={styles.image} />
          </View>
          <View style={styles.slide}>
            <Image source={{ uri: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQQZA8s3i80S9sJnQwPMBucnYOuPjOsPWuuWKP272agfS60vRU_0o1Vzv_6W03OySwua1OyWOjO2wlK9hVL2lzOgQ' }} style={styles.image} />
          </View>
          <View style={styles.slide}>
            <Image source={{ uri: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQQZA8s3i80S9sJnQwPMBucnYOuPjOsPWuuWKP272agfS60vRU_0o1Vzv_6W03OySwua1OyWOjO2wlK9hVL2lzOgQ' }} style={styles.image} />
          </View>
        </Swiper>
      </View>
    </View>
    <View style={styles.section}>
      <Text style={styles.sectionText}>Oulu hat eine lange und faszinierende Geschichte...</Text>
    </View>
  </ScrollView>
);
};

export default AboutOulu;
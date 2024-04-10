import React from 'react';
import { View, Text, TouchableOpacity, Platform, Linking, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import styles from '../style/ContactUsStyle';


const ContactUs = () => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.navigate('Home');
  };

  const handleEmail = () => {
    const to = 'support@exploreoulu.com'; 

    let url = `mailto:${to}`;

    if (Platform.OS === 'ios') {
      url = 'mailto:' + to;
    } else if (Platform.OS === 'android') {
      url = 'mailto:' + to;
    }

    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Ionicons name="arrow-back" size={20} color="#213A5C" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Contact Us</Text>
      </View>
      <Image source={require('/Users/lucagail/Team17-ExploreOulu/assets/Logo_transparent.png')} style={styles.image} />
      <Text style={styles.text}>Feel free to contact us for any inquiries and we will answer your questions:</Text>
      <TouchableOpacity onPress={handleEmail} style={styles.emailContainer}>
        <MaterialIcons name="email" size={24} color="white" style={styles.emailIcon} />
        <Text style={styles.emailText}>support@exploreoulu.com</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ContactUs;

import React from 'react';
import { View, Text, TouchableOpacity, Platform, Linking, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

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
      <Image source={require('/Users/lucagail/Team17-ExploreOulu/assets/Oulu_1.jpg')} style={styles.image} />
      <Text style={styles.text}>Feel free to contact us for any inquiries and we will answer your questions:</Text>
      <TouchableOpacity onPress={handleEmail} style={styles.emailContainer}>
        <MaterialIcons name="email" size={24} color="white" style={styles.emailIcon} />
        <Text style={styles.emailText}>support@exploreoulu.com</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    borderRadius: 10
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
  text: {
    fontSize: 18,
    margin: 20,
    textAlign: 'center',
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#213A5C',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    width: '80%',
  },
  emailIcon: {
    marginRight: 10,
    color: '#D6C9B6',
  },
  emailText: {
    color: '#D6C9B6',
    fontSize: 18,
    fontWeight: 'bold',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 12,
    marginHorizontal: 20,
  },
  backButton: {
   flexDirection: 'row',
 },
 backText: {
   fontSize: 16,
   fontWeight: 'bold',
   color: '#213A5C',
   marginLeft: 5,
  },
};

export default ContactUs;

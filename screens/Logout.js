import React, { useEffect } from 'react';
import { Alert, View } from 'react-native';
import { logout } from '../components/Auth'; 

const Logout = ({ navigation }) => {
  useEffect(() => {
    const performLogout = async () => {
      await logout(); 
      Alert.alert("You've been successfully logged out.", "", [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Login'), 
        },
      ]);
    };

    performLogout();
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    </View>
  );
};

export default Logout;

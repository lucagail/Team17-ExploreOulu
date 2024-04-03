import React, { useRef, useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions, Text, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function LoadingScreen() {  
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fadeIn = () => {
      Animated.timing(
        fadeAnim,
        {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }
      ).start();
    };

    fadeIn();

    const timer = setTimeout(() => {
      navigation.replace('DrawerNavigator');
    }, 4000);

    return () => clearTimeout(timer);
  }, [fadeAnim, navigation]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('/Users/lucagail/Team17-ExploreOulu/assets/Oulu_1.jpg')}
        resizeMode="cover"
        style={[styles.image, { opacity: fadeAnim }]}
      />
      <Animated.View style={[styles.textContainer, { opacity: fadeAnim }]}>
        <Text style={styles.text}>EXPLORE.</Text>
        <Text style={styles.text}>TRAVEL.</Text>
        <Text style={styles.text}>INSPIRE.</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff'
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  textContainer: {
    position: 'absolute',
    top: 80,
    left: 30,
  },
  text: {
    color: '#213A5C',
    fontSize: 28,
    fontWeight: 'bold',
  },
});
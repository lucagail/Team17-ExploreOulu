import React, { useState, useEffect } from 'react';
import { Text, View, Linking, Platform, TouchableOpacity, SafeAreaView, ActivityIndicator, Modal } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import styles from '../style/MapStyle';
import { hotels } from "../data/hotelsData.js";
import {restaurants} from "../data/restaurantsData.js";
import { sightseeing } from "../data/sightseeingData.js";
import Hotels from './Hotels';
import { useNavigation } from '@react-navigation/native';

const INITIAL_LATITUDE = 65.0121;
const INITIAL_LONGITUDE = 25.4651;
const INITIAL_LATITUDE_DELTA = 0.0922;
const INITIAL_LONGITUDE_DELTA = 0.0421;

const openMapsApp = (latitude, longitude) => {
  const url = Platform.select({
    ios: `maps://app?daddr=${latitude},${longitude}&dirflg=d`,
    android: `google.navigation:q=${latitude},${longitude}&mode=d`
  });
  Linking.openURL(url);
};

export default function Map() {

  const [latitude, setLatitude] = useState(INITIAL_LATITUDE);
  const [longitude, setLongitude] = useState(INITIAL_LONGITUDE);
  const [isLoading, setIsLoading] = useState(true);
  const [mapRef, setMapRef] = useState(null);
  const [showUserLocation, setShowUserLocation] = useState(false);
  const [filter, setFilter] = useState(null);

  const navigation = useNavigation(); 
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);


  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      try {
        if (status !== 'granted') {
          setIsLoading(false);
          console.log('Geolocation failed');
          return;
        }
        const location = await Location.getLastKnownPositionAsync(
          { accuracy: Location.Accuracy.High });
        setLatitude(location.coords.latitude);
        setLongitude(location.coords.longitude);
        setIsLoading(false);
        setShowUserLocation(true);
      }
      catch (error) {
        alert(error);
        setIsLoading(false);
      }
    })();
  }, [])

  const handleShowUserLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
      mapRef.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: INITIAL_LATITUDE_DELTA,
        longitudeDelta: INITIAL_LONGITUDE_DELTA
      });
    } catch (error) {
      console.error('Error getting current position', error);
    }
  };

  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  const openHotelModal = (hotel) => {
    navigation.navigate('Hotels', { modalVisible: true, selectedHotel: hotel });
  };

  const openRestaurantModal = (restaurant) => {
    navigation.navigate('Restaurants', { modalVisible: true, selectedRestaurant: restaurant });
  };

  const openSightseeingModal = (sightseeing) => {
    navigation.navigate('Sightseeing', { modalVisible: true, selectedCard: sightseeing });
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#213A5C" />
      </View>
    );
  }
  else {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.filterContainer}>
          <TouchableOpacity onPress={() => handleFilterChange(null)} style={[styles.filterButton, !filter && styles.activeFilterButton]}>
            <Text style={[styles.filterButtonText, !filter && styles.activeFilterButtonText]}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleFilterChange('hotels')} style={[styles.filterButton, filter === 'hotels' && styles.activeFilterButton]}>
            <Text style={[styles.filterButtonText, filter === 'hotels' && styles.activeFilterButtonText]}>Hotels</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleFilterChange('restaurants')} style={[styles.filterButton, filter === 'restaurants' && styles.activeFilterButton]}>
            <Text style={[styles.filterButtonText, filter === 'restaurants' && styles.activeFilterButtonText]}>Restaurants</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleFilterChange('sightseeing')} style={[styles.filterButton, filter === 'sightseeing' && styles.activeFilterButton]}>
            <Text style={[styles.filterButtonText, filter === 'sightseeing' && styles.activeFilterButtonText]}>Sightseeing</Text>
          </TouchableOpacity>
        </View>
        <MapView
          ref={(ref) => setMapRef(ref)}
          showsUserLocation={showUserLocation} 
          style={styles.map}
          initialRegion={{
            latitude: INITIAL_LATITUDE,
            longitude: INITIAL_LONGITUDE,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02
          }}
        >
          {hotels.map((hotel, index) => (
            (filter === null || filter === 'hotels') && (
              <Marker
                pinColor='#213A5C'
                key={index}
                coordinate={hotel.coordinates}
                title={hotel.name}
              >
                <Callout>
                  <View style={styles.calloutContainer}>
                  <TouchableOpacity onPress={() => openHotelModal(hotel)}>
                    <Ionicons name="information-circle-outline" size={24} color="#213A5C" />
                  </TouchableOpacity>
                    <Text style={styles.title}>{hotel.name}</Text>
                    <TouchableOpacity onPress={() => openMapsApp(hotel.coordinates.latitude, hotel.coordinates.longitude)}>
                      <Text style={styles.goText}>Go</Text>
                    </TouchableOpacity>
                  </View>
                </Callout>
              </Marker>
              
            )
          ))}
          {restaurants.map((restaurant, index) => (
            (filter === null || filter === 'restaurants') && (
              <Marker
                pinColor='#213A5C'
                key={index}
                coordinate={restaurant.coordinates}
                title={restaurant.name}
              >
                <Callout>
                  <View style={styles.calloutContainer}>
                  <TouchableOpacity onPress={() => openRestaurantModal(restaurant)}>
                    <Ionicons name="information-circle-outline" size={24} color="#213A5C" />
                  </TouchableOpacity>
                    <Text style={styles.title}>{restaurant.name}</Text>
                    <TouchableOpacity onPress={() => openMapsApp(restaurant.coordinates.latitude, restaurant.coordinates.longitude)}>
                      <Text style={styles.goText}>Go</Text>
                    </TouchableOpacity>
                  </View>
                </Callout>
              </Marker>
            )
          ))}
          {sightseeing.map((spot, index) => (
            (filter === null || filter === 'sightseeing') && (
              <Marker
                pinColor='#213A5C'
                key={index}
                coordinate={spot.coordinates}
                title={spot.name}
              >
                <Callout>
                  <View style={styles.calloutContainer}>
                  <TouchableOpacity onPress={() => openSightseeingModal(spot)}>
                    <Ionicons name="information-circle-outline" size={24} color="#213A5C" />
                  </TouchableOpacity>
                    <Text style={styles.title}>{spot.name}</Text>
                    <TouchableOpacity onPress={() => openMapsApp(spot.coordinates.latitude, spot.coordinates.longitude)}>
                      <Text style={styles.goText}>Go</Text>
                    </TouchableOpacity>
                  </View>
                </Callout>
              </Marker>
            )
          ))}
        </MapView>
        <TouchableOpacity style={styles.iconContainer} onPress={handleShowUserLocation}>
          <Ionicons name="locate" size={24} color="#D6C9B6" />
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

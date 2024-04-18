import React, { useState, useEffect } from 'react';
import { Text, View, Linking, Platform, TouchableOpacity, SafeAreaView } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import styles from '../style/MapStyle';
import hotelsData from "../data/hotelsData.json";
import restaurantsData from "../data/restaurantsData.json";

const INITIAL_LATITUDE = 65.0121;
const INITIAL_LONGITUDE = 25.4651;
const INITIAL_LATITUDE_DELTA = 0.0922;
const INITIAL_LONGITUDE_DELTA = 0.0421;

const sightseeing = [
  { title: 'Market Square and Surroundings', location: 'Kauppatori, 90100 Oulu', coordinates: { latitude: 65.01349, longitude: 25.46451 } },
  { title: 'Pikisaari', location: 'Pikisaari, 90100 Oulu', coordinates: { latitude: 65.01750, longitude: 25.45700 } },
  { title: 'Hailuoto', location: 'Hailuoto, 90480 Finland', coordinates: { latitude: 65.00954, longitude: 24.71509 } },
  { title: 'Car Museum', location: 'Automuseontie 3, 90410 Oulu', coordinates: { latitude: 64.96329, longitude: 25.50263 } },
  { title: 'Nalikari Beach', location: 'Nallikarinranta, 90500 Oulu', coordinates: { latitude: 65.03050, longitude: 25.41067 } },
  { title: 'Castle', location: 'Linnansaari 1, 90100 Oulu', coordinates: { latitude: 65.01738, longitude: 25.46808 } }
];

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

  if (isLoading) {
    return <View style={styles.container}>
      <Text style={styles.textLoading}>Retrieving location...</Text>
    </View>
  }
  else {
    return (
      <SafeAreaView style={styles.container}>
        <MapView
          ref={(ref) => setMapRef(ref)}
          showsUserLocation={showUserLocation} 
          style={styles.map}
          initialRegion={{
            latitude: INITIAL_LATITUDE,
            longitude: INITIAL_LONGITUDE,
            latitudeDelta: INITIAL_LATITUDE_DELTA,
            longitudeDelta: INITIAL_LONGITUDE_DELTA
          }}
        >
          {hotelsData.hotels.map((hotel, index) => (
            <Marker
              pinColor='#213A5C'
              key={index}
              coordinate={hotel.coordinates}
              title={hotel.name}
            >
              <Callout>
                <View style={styles.calloutContainer}>
                  <Text style={styles.title}>{hotel.name}</Text>
                  <TouchableOpacity onPress={() => openMapsApp(hotel.coordinates.latitude, hotel.coordinates.longitude)}>
                    <Text style={styles.goText}>Go</Text>
                  </TouchableOpacity>
                </View>
              </Callout>
            </Marker>
          ))}
          {restaurantsData.restaurants.map((restaurants, index) => (
            <Marker
              pinColor='#213A5C'
              key={index}
              coordinate={restaurants.coordinates}
              title={restaurants.name}
            >
              <Callout>
                <View style={styles.calloutContainer}>
                  <Text style={styles.title}>{restaurants.name}</Text>
                  <TouchableOpacity onPress={() => openMapsApp(restaurants.coordinates.latitude, restaurants.coordinates.longitude)}>
                    <Text style={styles.goText}>Go</Text>
                  </TouchableOpacity>
                </View>
              </Callout>
            </Marker>
          ))}
          {sightseeing.map((sightseeing, index) => (
            <Marker
              pinColor='#213A5C'
              key={index}
              coordinate={sightseeing.coordinates}
              title={sightseeing.title}
            >
              <Callout>
                <View style={styles.calloutContainer}>
                  <Text style={styles.title}>{sightseeing.title}</Text>
                  <TouchableOpacity onPress={() => openMapsApp(sightseeing.coordinates.latitude, sightseeing.coordinates.longitude)}>
                    <Text style={styles.goText}>Go</Text>
                  </TouchableOpacity>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
        <TouchableOpacity style={styles.iconContainer} onPress={handleShowUserLocation}>
          <Ionicons name="locate" size={24} color="black" />
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

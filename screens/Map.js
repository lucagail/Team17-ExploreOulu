import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, Text, View, Linking, Platform, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';

const INITIAL_LATITUDE = 65.0121;
const INITIAL_LONGITUDE = 25.4651;
const INITIAL_LATITUDE_DELTA = 0.0922;
const INITIAL_LONGITUDE_DELTA = 0.0421;

const hotels = [
  { title: 'Radisson Blue Hotel', location: 'Hallituskatu 1, 90100 Oulu', coordinates: { latitude: 65.0121, longitude: 25.4689 } },
  { title: 'Lapland Hotels Oulu', location: 'Kirkkokatu 3, 90100 Oulu', coordinates: { latitude: 65.0131, longitude: 25.4727 } },
  { title: 'Best Western Hotel Apollo', location: 'Asemakatu 31-33, 90100 Oulu', coordinates: { latitude: 65.0123, longitude: 25.4774 } },
  { title: 'Green Star Hotel', location: 'Uusikatu 26, 90100 Oulu', coordinates: { latitude: 65.0142, longitude: 25.4788 } }
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
      <View style={styles.container}>
        <MapView
          ref={(ref) => setMapRef(ref)}
          showsUserLocation={true}
          style={styles.map}
          initialRegion={{
            latitude: INITIAL_LATITUDE,
            longitude: INITIAL_LONGITUDE,
            latitudeDelta: INITIAL_LATITUDE_DELTA,
            longitudeDelta: INITIAL_LONGITUDE_DELTA
          }}
        >
          {hotels.map((hotel, index) => (
            <Marker
              pinColor='#213A5C'
              key={index}
              coordinate={hotel.coordinates}
              title={hotel.title}
            >
              <Callout>
                <View style={styles.calloutContainer}>
                  <Text style={styles.title}>{hotel.title}</Text>
                  <TouchableOpacity onPress={() => openMapsApp(hotel.coordinates.latitude, hotel.coordinates.longitude)}>
                    <Text style={styles.goText}>Go</Text>
                  </TouchableOpacity>
                </View>
              </Callout>
            </Marker>
          ))}
          <Marker
            pinColor='#213A5C'
            title="Your location"
            coordinate={{ latitude: latitude, longitude: longitude }}
          />
        </MapView>
        <TouchableOpacity style={styles.iconContainer} onPress={handleShowUserLocation}>
          <Ionicons name="locate" size={24} color="black" />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textLoading: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: "center",
    color: '#213A5C',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - Constants.statusBarHeight,
  },
  calloutContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: "center",
    justifyContent: 'center',
    width: 100,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: "center",
    padding: 10,
  },
  goText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: "center",
    color: '#213A5C',
  },
  iconContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    elevation: 5,
  }
});

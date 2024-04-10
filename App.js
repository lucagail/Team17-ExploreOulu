import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { Linking, View, Image } from 'react-native';
import LoadingScreen from './screens/LoadingScreen';
import Home from './screens/Home';
import Hotels from './screens/Hotels';
import Sightseeing from './screens/Sightseeing';
import Restaurants from './screens/Restaurants';
import Map from './screens/Map';
import AboutOulu from './screens/AboutOulu';
import ContactUs from './screens/ContactUs';
import Favorites from './screens/Favorites';
import Styles from './style/Styles';
import Login from './screens/Login';
import SignUp from './screens/SignUp'
import Profile from './screens/Profile';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const handleGoToTripAdvisor = () => {
  const tripAdvisorUrl = 'https://www.tripadvisor.com/Attractions-g189929-Activities-c42-Oulu_Northern_Ostrobothnia.html';
  Linking.openURL(tripAdvisorUrl);
 };
 
 const Tours = () => {
  const navigation = useNavigation(); 
 
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      handleGoToTripAdvisor();
      navigation.navigate('DrawerNavigator', { screen: 'Home' });
    });
 
    return unsubscribe;
  }, [navigation]);
 
  return null; 
 };

const MapIcon = () => {
  const navigation = useNavigation();

  return (
    <Ionicons
      name="location"
      size={24}
      color="#D6C9B6"
      onPress={() => navigation.navigate('Map')}
      style={{ marginRight: 15 }}
    />
  );
};

const DrawerNavigator = () => (
  <Drawer.Navigator 
    initialRouteName="Home"
    screenOptions={{
      swipeEnabled: false,
      drawerStyle: {
        backgroundColor: '#213A5C',
        width: 240,
      },
      drawerActiveTintColor: Styles.activeDrawerItem.color, 
      drawerInactiveTintColor: Styles.drawerItem.color,
      headerTintColor: '#D6C9B6', 
      }}
      >
    <Drawer.Screen name="Home" component={Home} options={{ headerTitle: 'Explore Oulu', headerRight: () => <MapIcon />, 
          headerStyle: { backgroundColor: '#213A5C',}, headerTitleStyle: { color: '#D6C9B6'},
          drawerIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />}} />

    <Drawer.Screen name="Hotels" component={Hotels} options={{ headerTitle: 'Explore Oulu', headerRight: () => <MapIcon />, 
          headerStyle: {backgroundColor: '#213A5C',}, headerTitleStyle: { color: '#D6C9B6'},
          drawerIcon: ({ color }) => <Ionicons name="bed" size={24} color={color} />}}/>

    <Drawer.Screen name="Sightseeing" component={Sightseeing} options={{ headerTitle: 'Explore Oulu', headerRight: () => <MapIcon />,
          headerStyle: {backgroundColor: '#213A5C',}, headerTitleStyle: { color: '#D6C9B6' },
          drawerIcon: ({ color }) => <Ionicons name="eye" size={24} color={color} />}}/> 

    <Drawer.Screen name="Restaurants" component={Restaurants} options={{ headerTitle: 'Explore Oulu', headerRight: () => <MapIcon />,
          headerStyle: {backgroundColor: '#213A5C',}, headerTitleStyle: { color: '#D6C9B6' },
          drawerIcon: ({ color }) => <Ionicons name="restaurant" size={24} color={color} />}}/> 

    <Drawer.Screen name="Tours" component={Tours} options={{ headerTitle: 'Explore Oulu', headerRight: () => <MapIcon />,
          headerStyle: {backgroundColor: '#213A5C',}, headerTitleStyle: { color: '#D6C9B6' },
          drawerIcon: ({ color }) => <Ionicons name="bus" size={24} color={color} />}}/>  

    <Drawer.Screen name="Map" component={Map} options={{ headerTitle: 'Explore Oulu', headerRight: () => <MapIcon />,
          headerStyle: {backgroundColor: '#213A5C',}, headerTitleStyle: { color: '#D6C9B6' },
          drawerIcon: ({ color }) => <Ionicons name="location" size={24} color={color} />}}/>
  
    <Drawer.Screen name="AboutOulu" component={AboutOulu} options={{ headerTitle: 'Explore Oulu', headerRight: () => <MapIcon />, 
          drawerLabel: 'About Oulu',
          headerStyle: {backgroundColor: '#213A5C',}, headerTitleStyle: { color: '#D6C9B6' },
          drawerIcon: ({ color }) => <Ionicons name="information-circle" size={24} color={color} />}}/> 
    
    <Drawer.Screen name="Favorites" component={Favorites} options={{ headerTitle: 'Explore Oulu', headerRight: () => <MapIcon />,
          drawerLabel: 'Favorites',
          headerStyle: {backgroundColor: '#213A5C',}, headerTitleStyle: { color: '#D6C9B6' },
          drawerIcon: ({ color }) => <Ionicons name="heart" size={24} color={color} />}}/>

    <Drawer.Screen name="ContactUs" component={ContactUs} options={{ headerTitle: 'Explore Oulu', headerRight: () => <MapIcon />,
          drawerLabel: 'Contact us',
          headerStyle: {backgroundColor: '#213A5C',}, headerTitleStyle: { color: '#D6C9B6' },
          drawerIcon: ({ color }) => <Ionicons name="mail" size={24} color={color} />}}/> 
    
    <Drawer.Screen name="Profile" component={Profile} options={{ headerTitle: 'Explore Oulu', headerRight: () => <MapIcon />,
          drawerLabel: 'My Profile',
          headerStyle: {backgroundColor: '#213A5C',}, headerTitleStyle: { color: '#D6C9B6' },
          drawerIcon: ({ color }) => <Ionicons name="person-circle" size={24} color={color} />}}/> 

  </Drawer.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="LoadingScreen" screenOptions={{ headerShown: false}}>
      <Stack.Screen name="LoadingScreen" component={LoadingScreen} options={{ gestureEnabled: false }}/>
      <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} options={{ gestureEnabled: false }}/>
      <Stack.Screen name="Home" component={Home} options={{ gestureEnabled: false }}/>
      <Stack.Screen name="Login" component={Login} options={{ gestureEnabled: false }}/>
      <Stack.Screen name="SignUp" component={SignUp} options={{ gestureEnabled: false }}/>
      <Stack.Screen name="Profile" component={Profile} options={{ gestureEnabled: false }}/>
      <Stack.Screen name="Hotels" component={Hotels} options={{ gestureEnabled: false }}/> 
      <Stack.Screen name="Sightseeing" component={Sightseeing} options={{ gestureEnabled: false }}/> 
      <Stack.Screen name="Restaurants" component={Restaurants} options={{ gestureEnabled: false }}/> 
      <Stack.Screen name="Tours" component={Tours} options={{ gestureEnabled: false }}/> 
      <Stack.Screen name="Map" component={Map} options={{ gestureEnabled: false }}/> 
      <Stack.Screen name="AboutOulu" component={AboutOulu} options={{ gestureEnabled: false }}/> 
      <Stack.Screen name="Favorites" component={Favorites} options={{ gestureEnabled: false }}/> 
    </Stack.Navigator>
  </NavigationContainer>
  );
};

export default App;



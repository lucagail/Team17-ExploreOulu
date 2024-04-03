import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { Linking } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import LoadingScreen from './screens/LoadingScreen';
import Home from './screens/Home';
import Hotels from './screens/Hotels';
import Sightseeing from './screens/Sightseeing';
import Restaurants from './screens/Restaurants';
import Map from './screens/Map';
import PeoplesChoice from './screens/PeoplesChoice';
import OneDayInOulu from './screens/OneDayInOulu';
import AboutOulu from './screens/AboutOulu';
import ContactUs from './screens/ContactUs';
import Favorites from './screens/Favorites';
import Styles from './style/Styles';

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
      drawerStyle: {
        backgroundColor: '#213A5C', //Background color drawer navigation
        width: 240,
      },
      drawerActiveTintColor: Styles.activeDrawerItem.color, 
      drawerInactiveTintColor: Styles.drawerItem.color,
      headerTintColor: '#D6C9B6', // Color menu icon
      
      }}>
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

    <Drawer.Screen name="OneDayInOulu" component={OneDayInOulu} options={{ headerTitle: 'Explore Oulu', headerRight: () => <MapIcon />,
          drawerLabel: '1 Day in Oulu',
          headerStyle: {backgroundColor: '#213A5C',}, headerTitleStyle: { color: '#D6C9B6' },
          drawerIcon: ({ color }) => <MaterialCommunityIcons name="hours-24" size={24} color={color} />}}/> 

    <Drawer.Screen name="PeoplesChoice" component={PeoplesChoice} options={{ headerTitle: 'Explore Oulu', headerRight: () => <MapIcon />,
          drawerLabel: "PeoplesChoice",
          headerStyle: {backgroundColor: '#213A5C',}, headerTitleStyle: { color: '#D6C9B6' },
          drawerIcon: ({ color }) => <Ionicons name="heart" size={24} color={color} />}}/> 
  
    
    <Drawer.Screen name="AboutOulu" component={AboutOulu} options={{ headerTitle: 'Explore Oulu', headerRight: () => <MapIcon />, 
          drawerLabel: 'About Oulu',
          headerStyle: {backgroundColor: '#213A5C',}, headerTitleStyle: { color: '#D6C9B6' },
          drawerIcon: ({ color }) => <Ionicons name="information-circle" size={24} color={color} />}}/> 
 

  <Drawer.Screen name="ContactUs" component={ContactUs} options={{ headerTitle: 'Explore Oulu', headerRight: () => <MapIcon />,
          drawerLabel: 'Contact us',
          headerStyle: {backgroundColor: '#213A5C',}, headerTitleStyle: { color: '#D6C9B6' },
          drawerIcon: ({ color }) => <Ionicons name="mail" size={24} color={color} />}}/> 


  </Drawer.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="LoadingScreen" screenOptions={{ headerShown: false}}>
      <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
      <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
      <Stack.Screen name="Hotels" component={Hotels} /> 
      <Stack.Screen name="Sightseeing" component={Sightseeing} /> 
      <Stack.Screen name="Restaurants" component={Restaurants} /> 
      <Stack.Screen name="Tours" component={Tours} /> 
      <Stack.Screen name="Map" component={Map} /> 
      <Stack.Screen name="OneDayInOulu" component={OneDayInOulu} /> 
      <Stack.Screen name="PeoplesChoice" component={PeoplesChoice} /> 
      <Stack.Screen name="AboutOulu" component={AboutOulu} /> 
    </Stack.Navigator>
  </NavigationContainer>
  );
};

export default App;



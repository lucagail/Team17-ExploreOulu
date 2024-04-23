import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
        container: {
          flexGrow: 1,
          backgroundColor: '#ffffff'
        },
        header: {
          marginVertical: 12,
          marginHorizontal: 20,
        },
        backButton: {
          flexDirection: 'row',
          alignItems: 'center',
        },
        backText: {
          fontSize: 18,
          fontWeight: 'bold',
          color: '#213A5C',
          marginLeft: 5,
        },
        subtitle: {
          fontSize: 20,
          fontWeight: 'bold',
          color: '#213A5C',
          marginLeft: 20
        },
        titleContainer: {
          marginBottom: 10,
          marginLeft: 20
        },
        title: {
          fontSize: 22,
          fontWeight: 'bold',
          color: '#213A5C',
        },
        hotelContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          margin: 20,
          backgroundColor: '#f6f3ee',
          padding: 10,
          borderRadius: 8,
        },
        hotelImage: {
          width: width * 0.25,
          height: width * 0.25,
          borderRadius: 8,
          marginRight: 10,
        },
        hotelDetails: {
          flex: 1,
        },
        hotelName: {
          fontSize: 18,
          fontWeight: 'bold',
          marginBottom: 5,
          color: '#213A5C'
        },
        hotelLocation: {
          fontSize: 14,
          fontStyle: 'italic'
        },
        noHotelContainer: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          margin: 20
        },
        noHotelText: {
          fontSize: 18,
          color: '#213A5C',
        },
      });
      
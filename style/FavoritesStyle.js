import { StyleSheet } from 'react-native';

export default StyleSheet.create({
        container: {
          flexGrow: 1,
          backgroundColor: '#ffffff'
        },
        header: {
          fontSize: 24,
          fontWeight: 'bold',
          marginVertical: 12,
          marginHorizontal: 20,
        },
        backButton: {
          flexDirection: 'row',
          alignItems: 'center',
        },
        backText: {
          fontSize: 16,
          fontWeight: 'bold',
          color: '#213A5C',
          marginLeft: 5,
        },
        titleContainer: {
          marginBottom: 10,
          marginLeft: 20
        },
        title: {
          fontSize: 20,
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
          width: 100,
          height: 100,
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
        },
        noHotelText: {
          fontSize: 18,
          color: '#213A5C',
        },
      });
      
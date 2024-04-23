import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#ffffff'
      },
      cardContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20
      },
      card: {
        marginBottom: 20,
        backgroundColor: '#ffffff'
      },
      location: {
        fontStyle: 'italic',
        fontSize: 18,
        marginTop: 8,
        textAlign: 'right'
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
      titleContainer: {
        marginBottom: 10,
        marginLeft: 20
      },
      title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#213A5C',
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
      },
      modalContent: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 20,
        width: width * 0.8
      },
      modalImage: {
        width: '100%',
        height: width * 0.5,
        resizeMode: 'cover',
        borderRadius: 10,
        marginBottom: 10
      },
      modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#213A5C'
      },
      modalLocation: {
        fontStyle: 'italic',
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'right'
      },
      modalDescription: {
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'justify'
      },
      closeButton: {
        marginTop: 10
      },
      cardItem: {
        marginBottom: 20,
        position: 'relative',
      },
      cardFooter: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 10,
      },
    });
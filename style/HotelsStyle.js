import { StyleSheet } from 'react-native';

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
      },
      location: {
        fontStyle: 'italic',
        fontSize: 16,
        marginTop: 8,
        textAlign: 'right'
      },
      description: {
        fontSize: 14,
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
        width: '80%'
      },
      modalImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        borderRadius: 10,
        marginBottom: 10
      },
      modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#213A5C'
      },
      modalLocation: {
        fontStyle: 'italic',
        fontSize: 14,
        marginBottom: 5,
        textAlign: 'right'
      },
      modalDescription: {
        fontSize: 14,
        marginBottom: 10,
        textAlign: 'justify'
      },
      closeButton: {
        marginTop: 10,
      },
      cardItem: {
        marginBottom: 20,
        position: 'relative',
      },
      plusButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#ffffff',
        borderRadius: 20,
        elevation: 4,
        zIndex: 1,
        padding: 5
      },
      button: {
        backgroundColor: '#213A5C',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 20 
      },
      buttonText: {
        color: '#D6C9B6',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
      },

    });
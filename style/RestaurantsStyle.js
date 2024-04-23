import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#ffffff'
      },
      card: {
        marginVertical: 12,
        marginHorizontal: 20,
        backgroundColor: '#ffffff'
      },
      location: {
        fontStyle: 'italic',
        fontSize: 18,
        marginTop: 8,
        textAlign: 'right'
      },
      name: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#213A5C',
      },
      description: {
        fontSize: 16,
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
      categoriesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
        marginHorizontal: 20
      },
      categoryButton: {
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#213A5C',
      },
      selectedCategory: {
        backgroundColor: '#213A5C',
      },
      categoryText: {
        color: '#213A5C',
        fontSize: 14,
        fontWeight: 'bold',
      },
      selectedCategoryText: {
        color: '#D6C9B6',
        fontSize: 14,
        fontWeight: 'bold',
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
        width: "100%",
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
        marginBottom: 5,
        textAlign: 'right'
      },
      modalDescription: {
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'justify'
      },
      modalPrice: {
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: 'justify'
      },
      closeButton: {
        marginTop: 10,
      },
      cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
      },
    });
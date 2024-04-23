import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#ffffff',
      },
      image: {
        width: width*0.6,
        height: width*0.6,
        resizeMode: 'cover',
        borderRadius: 10,
        alignSelf: 'center',
        margin: 10
      },
      titleContainer: {
        marginBottom: 10,
        marginLeft: 20
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#213A5C',
      },
      text: {
        fontSize: 16,
        margin: 20,
        textAlign: 'center',
      },
      emailContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#213A5C',
        padding: 10,
        borderRadius: 5,
        alignSelf: 'center',
        width: width * 0.8,
      },
      emailIcon: {
        marginRight: 10,
        color: '#D6C9B6',
      },
      emailText: {
        color: '#D6C9B6',
        fontSize: 18,
        fontWeight: 'bold',
      },
      header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 12,
        marginHorizontal: 20,
      },
      backButton: {
       flexDirection: 'row',
     },
     backText: {
       fontSize: 18,
       fontWeight: 'bold',
       color: '#213A5C',
       marginLeft: 5,
      },

    });
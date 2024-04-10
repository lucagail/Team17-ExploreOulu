import { StyleSheet } from 'react-native';

export default StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#ffffff',
      },
      image: {
        width: 200,
        height: 200,
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
        fontSize: 18,
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
        width: '80%',
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
       fontSize: 16,
       fontWeight: 'bold',
       color: '#213A5C',
       marginLeft: 5,
      },

    });
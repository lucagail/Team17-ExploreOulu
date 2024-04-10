import { StyleSheet, Dimensions } from 'react-native';


export default StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff'
      },
      image: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      },
      textContainer: {
        position: 'absolute',
        top: 80,
        left: 30,
      },
      text: {
        color: '#213A5C',
        fontSize: 28,
        fontWeight: 'bold',
      },
});
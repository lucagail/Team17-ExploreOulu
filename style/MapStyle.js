import { StyleSheet, Dimensions } from 'react-native';
import Constants from 'expo-constants';
export default StyleSheet.create({

    container: {
        paddingTop: Constants.statusBarHeight,
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center'
      },
      textLoading: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: "center",
        color: '#213A5C',
      },
      map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - Constants.statusBarHeight,
      },
      calloutContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: "center",
        justifyContent: 'center',
        width: 100,
      },
      title: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: "center",
        padding: 10,
      },
      goText: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: "center",
        color: '#213A5C',
      },
      iconContainer: {
        position: 'absolute',
        top: 20,
        right: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 10,
        elevation: 5,
      }
    });
    
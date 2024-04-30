import { StyleSheet, Dimensions, StatusBar } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: StatusBar.currentHeight,  
  },
  image: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: 10,
    marginTop: 30
  },
  headerItem: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
  },
  header: {
    color: '#213A5C',
    fontWeight: 'bold',
    fontSize: 24,
  },
  infoText: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 18,
    paddingHorizontal: 20
  },
  passwordInfoText: {
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 5,
    fontSize: 18,
    textAlign: 'center'
  },
  signupContainer: {
    position: 'absolute',
    bottom: 50,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 20
  },
  signupText: {
    marginRight: 5,
    fontWeight: 'bold',
    fontSize: 18
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#213A5C',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 15,
    marginBottom: 15,
    width: width * 0.9,
  },
  buttonText: {
    color: '#D6C9B6',
    fontSize: 18,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#213A5C',
    width: width * 0.9,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 10,
    fontSize: 18
  },
  logoutIcon: {
    marginTop: 10,
    marginLeft: 10
  },
  linkText: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    color: '#213A5C',
    fontSize: 18
  }
});
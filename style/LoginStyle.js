import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
    fontSize: 16,
    paddingHorizontal: 20
  },
  passwordInfoText: {
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 5,
    fontSize: 14,
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
    fontWeight: 'bold'
  },
  buttonStyle: {
    backgroundColor: '#213A5C',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 15,
    marginBottom: 15,
    width: width * 0.9,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#213A5C',
    width: width * 0.9,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 10,
    fontSize: 16
  },
  logoutIcon: {
    marginTop: 10,
    marginLeft: 10
  },
  linkText: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    color: '#213A5C'
  },
  image: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: 10,
    margin: 10,
  },
});
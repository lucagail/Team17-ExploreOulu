import { StyleSheet, Dimensions, StatusBar } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    marginTop: StatusBar.currentHeight, 
  },
  headerItem: {
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 10,
    alignItems: 'center',
  },
  header: {
    color: '#213A5C',
    fontWeight: 'bold',
    fontSize: 26,
  },
  infoText: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 16,
    paddingHorizontal: 20
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
    fontSize: 16
  },
  logoutIcon: {
    marginTop: 10,
    marginLeft: 10
  },
});
import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  headerItem: {
    flexDirection: 'row',
    marginVertical: 20,
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
});
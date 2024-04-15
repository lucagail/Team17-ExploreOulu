import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  headerItem: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
  },
  header: {
    color: '#213A5C',
    fontWeight: 'bold',
    fontSize: 26,
  },
  subheader: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  myAccountSubheader: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
 },
  newItem: {
    marginVertical: 10,
    alignItems: 'flex-start',
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
    width: '90%',
  },
  deleteAccountButton: {
    marginTop: 10,
    marginBottom: 20,
    width: "90%",
    color: 'red',
    backgroundColor: '#213A5C'
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#213A5C',
    width: '90%',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 10,
    fontSize: 16
  },
  todoItem: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  todoText: {
    borderColor: '#afafaf',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
    minWidth: '70%'
  },
  myAccountLabel: {
    marginTop: 5,
    marginBottom: 3,
    fontSize: 15
  },
  myAccountTextInput: {
    borderWidth: 1,
    borderColor: '#afafaf',
    width: '90%',
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 5,
    fontSize: 15
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
    width: 110,
    height: 110,
    borderRadius: 10,
    margin: 10,
  },
});
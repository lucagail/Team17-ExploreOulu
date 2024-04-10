import { StyleSheet } from 'react-native';

export default StyleSheet.create({

container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  imageContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: 20
  },
  imageWrapper: {
    marginBottom: 20,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  titleContainerLeft: {
    position: 'absolute',
    top: '100%',
    left: 10,
    backgroundColor: 'rgba(214, 201, 182, 0.8)', 
    padding: 10,
    borderRadius: 10,
    transform: [{ translateY: -50 }],
    width: '50%',
  },
  imageTextLeft: {
    color: '#213A5C',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
    
  },
  titleContainerRight: {
    position: 'absolute',
    top: '100%',
    right: 10,
    backgroundColor: 'rgba(214, 201, 182, 0.8)', 
    padding: 10,
    borderRadius: 10,
    transform: [{ translateY: -50 }],
    width: '50%',
  },
  imageTextRight: {
    color: '#213A5C',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
    
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 12,
    marginHorizontal: 20,  
  },
  backButton: {
   flexDirection: 'row',
   alignItems: 'center',
 },
 backText: {
   fontSize: 16,
   fontWeight: 'bold',
   color: '#213A5C',
   marginLeft: 5,
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

});
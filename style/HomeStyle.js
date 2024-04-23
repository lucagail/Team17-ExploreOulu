import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({

container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  imageContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: width * 0.05
  },
  imageWrapper: {
    marginBottom: width * 0.05,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: width * 0.4,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  titleContainerLeft: {
    position: 'absolute',
    top: '100%',
    left: width * 0.03,
    backgroundColor: 'rgba(214, 201, 182, 0.9)', 
    padding: width * 0.025,
    borderRadius: 10,
    transform: [{ translateY: -width * 0.12 }],
    width: '50%',
  },
  imageTextLeft: {
    color: '#213A5C',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  titleContainerRight: {
    position: 'absolute',
    top: '100%',
    right: width * 0.03,
    backgroundColor: 'rgba(214, 201, 182, 0.9)', 
    padding: width * 0.025,
    borderRadius: 10,
    transform: [{ translateY: -width * 0.12 }],
    width: '50%',
  },
  imageTextRight: {
    color: '#213A5C',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right', 
  },
});
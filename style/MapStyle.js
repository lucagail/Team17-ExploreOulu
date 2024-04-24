import { StyleSheet, Dimensions } from 'react-native';
import Constants from 'expo-constants';

const { width } = Dimensions.get('window');
const isSmallDevice = width < 375;

export default StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textLoading: {
    fontSize: isSmallDevice ? 14 : 16,
    fontWeight: 'bold',
    textAlign: "center",
    color: '#213A5C',
    marginBottom: 20
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - Constants.statusBarHeight,
  },
  calloutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: isSmallDevice ? 100 : 150,
    padding: 10,
  },
  title: {
    fontSize: isSmallDevice ? 12 : 14,
    fontWeight: 'bold',
    textAlign: "center",
    flex: 1,
  },
  goText: {
    fontSize: isSmallDevice ? 12 : 14,
    fontWeight: 'bold',
    textAlign: "center",
    color: '#213A5C',
  },
  iconContainer: {
    position: 'absolute',
    top: 60,
    right: 10,
    backgroundColor: '#213A5C',
    borderRadius: 20,
    padding: 10,
    elevation: 5,
  },
  filterContainer: {
    position: 'absolute',
    top: 10, 
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: '#213A5C',
    borderRadius: 10,
    padding: 5,
    elevation: 5,
    zIndex: 1,
  },
  filterButton: {
    paddingHorizontal: 10,
  },
  activeFilterButton: {
    backgroundColor: '#D6C9B6',
    borderRadius: 10,
  },
  filterButtonText: {
    fontSize: isSmallDevice ? 14 : 16,
    color: '#D6C9B6',
  },
  activeFilterButtonText: {
    color: '#213A5C',
  }
});

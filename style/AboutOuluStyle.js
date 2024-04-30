import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    marginVertical: 12,
    marginHorizontal: 20,
  },
  subheader: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#213A5C',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#213A5C',
    marginLeft: 5,
  },
  titleContainer: {
    marginBottom: 10,
    marginLeft: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#213A5C',
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: '#ffffff',
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'justify',
  },
  imageSection: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 15,
    borderRadius: 10,
  },
  sliderContainer: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '75%',
    height: '75%',
    borderRadius: 10,
  },
});
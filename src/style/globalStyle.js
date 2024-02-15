import { StyleSheet } from 'react-native';

const globalStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fdf6e2',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  h1: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
  },
  text: {
    textAlign: 'center',
    color: 'black',
  },
});

export default globalStyle;
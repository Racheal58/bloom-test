import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinContainer: {
    height: '25%',
    justifyContent: 'flex-end',
    paddingBottom: 40,
  },
  cellStyle: {
    borderBottomWidth: 2,
    borderColor: 'gray',
  },
  cellStyleFocused: {
    borderColor: 'black',
  },
  keyPadContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    justifyContent: 'center',
    height: '75%',
  },
  loaderContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  keyPadStyle: {
    width: '33.3333%',
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyle: {
    borderWidth: 1,
    borderColor: 'grey',
    paddingHorizontal: '5%',
    width: '65%',
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTextStyle: {fontSize: 20},
});

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Button,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from 'react-native';

import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import {useAsync} from 'react-async';
import {login, logout} from './api';

const KeyBoard = (props: any) => {
  return (
    <View
      style={{
        width: '33.3333%',
        height: 130,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Pressable
        onPress={() => props.onPress(props.value)}
        style={{
          borderWidth: 1,
          borderColor: 'grey',
          paddingHorizontal: '5%',
          width: '65%',
          height: '70%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 20}}>{props.value}</Text>
      </Pressable>
    </View>
  );
};

const Loader = () => {
  return (
    <View
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
      }}>
      <ActivityIndicator size={'large'} />
    </View>
  );
};

const App = () => {
  const [pin, setPin] = useState('');
  const [tokenState, setTokenState] = useState('');

  const onKeyPress = (text: string) => {
    setPin(prev => prev + text);
  };
  const {isLoading: isLoggingIn, run: runLogIn} = useAsync({
    deferFn: useCallback(() => login(pin), [pin]),
    onResolve: useCallback(({token}) => {
      if (token) {
        setTokenState(token);
        setPin('');
      }
    }, []),
  });
  const {isLoading: isLoggingOut, run: runLogOut} = useAsync({
    deferFn: useCallback(() => logout(), []),
    onResolve: useCallback(() => {
      setTokenState('');
    }, []),
  });
  useEffect(() => {
    if (pin.length === 4) {
      runLogIn();
    }
  }, [pin.length, runLogIn]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {!tokenState ? (
        <>
          <View
            style={{
              height: '25%',
              justifyContent: 'flex-end',
              paddingBottom: 40,
            }}>
            <SmoothPinCodeInput
              password
              mask="﹡"
              cellStyle={{
                borderBottomWidth: 2,
                borderColor: 'gray',
              }}
              cellStyleFocused={{
                borderColor: 'black',
              }}
              value={pin}
              onTextChange={setPin}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              paddingHorizontal: 20,
              justifyContent: 'center',
              height: '75%',
            }}>
            <KeyBoard value={1} onPress={onKeyPress} />
            <KeyBoard value={2} onPress={onKeyPress} />
            <KeyBoard value={3} onPress={onKeyPress} />
            <KeyBoard value={4} onPress={onKeyPress} />
            <KeyBoard value={5} onPress={onKeyPress} />
            <KeyBoard value={6} onPress={onKeyPress} />
            <KeyBoard value={7} onPress={onKeyPress} />
            <KeyBoard value={8} onPress={onKeyPress} />
            <KeyBoard value={9} onPress={onKeyPress} />
            <KeyBoard value={0} onPress={onKeyPress} />
          </View>
        </>
      ) : (
        <View>
          <Button title="Logout" onPress={runLogOut} color={'red'} />
        </View>
      )}
      {isLoggingIn && <Loader />}
      {isLoggingOut && <Loader />}
    </SafeAreaView>
  );
};

export default App;

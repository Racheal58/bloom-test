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

import {useAsync} from 'react-async';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import api from './api';

type KeyPadProps = {
  value: string;
  onPress: (value: string) => void;
};

const KeyPad = ({value, onPress}: KeyPadProps) => {
  return (
    <View
      style={{
        width: '33.3333%',
        height: 130,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Pressable
        onPress={() => onPress(value)}
        style={{
          borderWidth: 1,
          borderColor: 'grey',
          paddingHorizontal: '5%',
          width: '65%',
          height: '70%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        testID={`input-${value}`}>
        <Text style={{fontSize: 20}}>{value}</Text>
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
    deferFn: useCallback(async () => {
      return api.login(pin);
    }, [pin]),
    onResolve: useCallback(response => {
      const {token} = response;
      if (token) {
        setTokenState(token);
        setPin('');
      }
    }, []),
    onReject: useCallback(error => {
      setPin('');
    }, []),
  });
  const {isLoading: isLoggingOut, run: runLogOut} = useAsync({
    deferFn: useCallback(() => api.logout(tokenState), [tokenState]),
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
            }}
            testID="keyboard">
            <KeyPad value="1" onPress={onKeyPress} />
            <KeyPad value="2" onPress={onKeyPress} />
            <KeyPad value="3" onPress={onKeyPress} />
            <KeyPad value="4" onPress={onKeyPress} />
            <KeyPad value="5" onPress={onKeyPress} />
            <KeyPad value="6" onPress={onKeyPress} />
            <KeyPad value="7" onPress={onKeyPress} />
            <KeyPad value="8" onPress={onKeyPress} />
            <KeyPad value="9" onPress={onKeyPress} />
            <KeyPad value="0" onPress={onKeyPress} />
          </View>
        </>
      ) : (
        <View>
          <Button
            title="Logout"
            onPress={runLogOut}
            color={'red'}
            testID="log-out-btn"
          />
        </View>
      )}
      {isLoggingIn && <Loader />}
      {isLoggingOut && <Loader />}
    </SafeAreaView>
  );
};

export default App;

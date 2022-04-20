import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Button, SafeAreaView, View} from 'react-native';

import {useAsync} from 'react-async';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import api from './api';
import styles from './styles';
import KeyPad from './components/KeyPad';
import Loader from './components/Loader';

const App = () => {
  const [pin, setPin] = useState('');
  const [tokenState, setTokenState] = useState('');
  const MAX_PIN_LENGTH = 4;
  const onKeyPress = (text: string) => {
    if (pin.length < MAX_PIN_LENGTH) {
      setPin(prev => prev + text);
    }
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
      if (error.name === 'ApiError') {
        setPin('');
      }
    }, []),
  });
  const {isLoading: isLoggingOut, run: runLogOut} = useAsync({
    deferFn: useCallback(() => api.logout(tokenState), [tokenState]),
    onResolve: useCallback(() => {
      setTokenState('');
    }, []),
  });
  useEffect(() => {
    if (pin.length === MAX_PIN_LENGTH) {
      runLogIn();
    }
  }, [pin.length, runLogIn]);

  const keypadBtns = useMemo(
    () => [
      {value: '1'},
      {value: '2'},
      {value: '3'},
      {value: '4'},
      {value: '5'},
      {value: '6'},
      {value: '7'},
      {value: '8'},
      {value: '9'},
      {value: '0'},
    ],
    [],
  );

  return (
    <SafeAreaView style={styles.container}>
      {!tokenState ? (
        <>
          <View style={styles.pinContainer}>
            <SmoothPinCodeInput
              password
              mask="﹡"
              cellStyle={styles.cellStyle}
              cellStyleFocused={styles.cellStyleFocused}
              value={pin}
              onTextChange={setPin}
              inputProps={{showSoftInputOnFocus: false}}
            />
          </View>

          <View style={styles.keyPadContainer} testID="keyboard">
            {keypadBtns.map(({value}) => (
              <KeyPad key={value} value={value} onPress={onKeyPress} />
            ))}
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

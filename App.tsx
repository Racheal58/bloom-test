import React, {useCallback, useEffect, useState} from 'react';
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
    onReject: useCallback(() => {
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
    if (pin.length === MAX_PIN_LENGTH) {
      runLogIn();
    }
  }, [pin.length, runLogIn]);
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

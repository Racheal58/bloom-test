/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {Button, Pressable, SafeAreaView, Text, View} from 'react-native';

import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
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

const App = () => {
  const [pin, setPin] = useState('');
  const [tokenState, setTokenState] = useState('');

  const onKeyPress = (text: string) => {
    setPin(prev => prev + text);
  };

  useEffect(() => {
    if (pin.length === 4) {
      setPin('');
      login(pin).then(({token}) => {
        if (token) {
          setTokenState(token);
        }
      });
    }
  }, [pin]);

  const onLogout = () => {
    logout().then(() => {
      setTokenState('');
    });
  };

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
          <Button title="Logout" onPress={onLogout} color={'red'} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default App;

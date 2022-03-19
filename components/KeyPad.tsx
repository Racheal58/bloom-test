import React from 'react';
import {Pressable, Text, View} from 'react-native';

import styles from '../styles';

type KeyPadProps = {
  value: string;
  onPress: (value: string) => void;
};

const KeyPad = ({value, onPress}: KeyPadProps) => {
  return (
    <View style={styles.keyPadStyle}>
      <Pressable
        onPress={() => onPress(value)}
        style={styles.buttonStyle}
        testID={`input-${value}`}>
        <Text style={styles.buttonTextStyle}>{value}</Text>
      </Pressable>
    </View>
  );
};

export default KeyPad;

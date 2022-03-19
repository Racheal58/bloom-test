import {Alert} from 'react-native';

const BASE_API_URL = 'http://localhost:3000';

const fetchTransform = async (res: Response) => {
  const {error, ...data} = await res.json();
  if (error) {
    Alert.alert(error);
    throw new Error(error);
  }
  return data;
};

export const login = (pin: string) => {
  return fetch(`${BASE_API_URL}/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      pin,
    }),
  }).then(fetchTransform);
};

export const logout = (token: string) => {
  return fetch(`${BASE_API_URL}/logout`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
  }).then(fetchTransform);
};

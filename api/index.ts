import {Alert} from 'react-native';
import Config from 'react-native-config';
const fetchTransform = async (res: Response) => {
  const {error, ...data} = await res.json();
  if (error) {
    Alert.alert(error);
    const apiError = new Error(error);
    apiError.name = 'ApiError';
  }
  return data;
};

const fetchErrorTransform = async (error: Error) => {
  if (error.message.includes('Network')) {
    Alert.alert(error.message);
  }
  throw error;
};

const fetcher = (...args: Parameters<typeof fetch>) => {
  return fetch(...args).then(fetchTransform, fetchErrorTransform);
};

const login = (pin: string) => {
  return fetcher(`${Config.BASE_API_URL}/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      pin,
    }),
  });
};

const logout = (token: string) => {
  return fetcher(`${Config.BASE_API_URL}/logout`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
};

export default {
  login,
  logout,
};

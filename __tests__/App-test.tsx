/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import api from '../api';

jest.mock('../api');
(api.login as jest.MockedFunction<typeof api.login>).mockResolvedValue({
  token: 'TOKEN',
});
(api.logout as jest.MockedFunction<typeof api.logout>).mockResolvedValue(
  undefined,
);

it('navigates to page with log out button after entering pin', async () => {
  const {getByTestId, queryByTestId} = render(<App />);
  expect(queryByTestId('log-out-btn')).toBeFalsy();
  const button0 = getByTestId('input-0');
  fireEvent.press(button0);
  fireEvent.press(button0);
  fireEvent.press(button0);
  fireEvent.press(button0);
  await waitFor(() => expect(queryByTestId('log-out-btn')).toBeTruthy());
  expect(queryByTestId('keyboard')).toBeFalsy();
  const logOutBtn = getByTestId('log-out-btn');
  fireEvent.press(logOutBtn);
  await waitFor(() => expect(queryByTestId('keyboard')).toBeTruthy());
});

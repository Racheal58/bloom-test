export const login = (pin: string) => {
  return fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      pin,
    }),
  }).then(res => {
    return res.json();
  });
};

export const logout = () => {
  return fetch('http://localhost:3000/logout', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(res => {
    return res.json();
  });
};

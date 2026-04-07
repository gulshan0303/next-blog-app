import { api } from '../../lib/api';

export const loginUser = (data: { email: string; password: string }) => {
  return api('/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const registerUser = (data: { email: string; password: string }) => {
  return api('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const refreshToken = () => {
  return api('/auth/refresh', {
    method: 'POST',
  });
};

export const logoutUser = () => {
  return api('/auth/logout', {
    method: 'POST',
  });
};

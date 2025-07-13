import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
  isAuthenticated: JSON.parse(Cookies.get('isAuth') || 'false'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
        Cookies.set('isAuth', true);
      state.isAuthenticated = true;
    },
    logout: (state) => {
        Cookies.remove('isAuth');
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer; 
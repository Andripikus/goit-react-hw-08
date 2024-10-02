// src/redux/auth/selectors.js

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectUser = (state) => state.auth.user;
export const selectAuthToken = (state) => state.auth.token;
export const selectAuthError = (state) => state.auth.error;

// Правильне ім'я селектора
export const selectIsRefreshing = (state) => state.auth.isRefreshing;

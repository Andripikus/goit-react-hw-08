// // src/redux/auth/selectors.js
// export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
// export const selectUser = (state) => state.auth.user;
// export const selectIsRefreshing = (state) => state.auth.isRefreshing;
// src/redux/auth/selectors.js
export const selectAuthError = (state) => state.auth.error; // Селектор для отримання помилки

// src/redux/auth/selectors.js
export const selectIsRefreching = (state) => state.auth.isRefreshing; // Вибірка статусу оновлення
export const selectUser = (state) => state.auth.user; // Вибірка користувача
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn; // Вибірка статусу авторизації

// src/redux/contacts/selectors.js

export const selectContacts = (state) => state.contacts.items; // Приклад селектора
export const selectLoading = (state) => state.contacts.loading; // Селектор для стану завантаження
export const selectError = (state) => state.contacts.error; // Селектор для помилок

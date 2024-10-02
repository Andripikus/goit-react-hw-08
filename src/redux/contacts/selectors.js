// Імпорт необхідних інструментів
import { createSelector } from '@reduxjs/toolkit'; // Імпорт createSelector
import { selectNameFilter } from '../filter/selectors'; // Переконайтеся, що шлях до вашого селектора фільтра правильний

// Селектор для отримання контактів
export const selectContacts = (state) => state.contacts.items;

// Селектор для стану завантаження
export const selectLoading = (state) => state.contacts.loading;

// Селектор для помилок
export const selectError = (state) => state.contacts.error;

// Селектор для відфільтрованих контактів
export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, filterName) => {
    if (!filterName) {
      return contacts; // Якщо фільтр порожній, повертаємо всі контакти
    }
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterName.toLowerCase())
    );
  }
);


import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Встановлюємо базову URL-адресу для запитів
axios.defaults.baseURL = "https://connections-api.goit.global";

// Отримати всі контакти
export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkAPI) => {
    try {
      const respons = await axios.get("/contacts");
      return respons.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
  {
    // Перевірка чи користувач залогінений перед виконанням запиту
    condition: (_, thunkAPI) => {
      const state = thunkAPI.getState();
      return state.auth.isLoggedIn === true; // Запит виконується, якщо користувач залогінений
    },
  }
);

// Додати новий контакт
export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (contact, thunkAPI) => {
    try {
      const respons = await axios.post("/contacts", { ...contact });
      return respons.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Видалити контакт
export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (contactId, thunkAPI) => {
    try {
      const respons = await axios.delete(`/contacts/${contactId}`);
      return contactId; // Повертаємо ID видаленого контакту
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

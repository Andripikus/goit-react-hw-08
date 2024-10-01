// src/redux/auth/operations.js
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Налаштування базової URL-адреси для бекенду
axios.defaults.baseURL = "https://connections-api.goit.global/";

// ** Додаємо JWT до заголовків
const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// ** Видаляємо JWT із заголовків
const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

/*
 * POST @ /users/signup
 * body: { name, email, password }
 * Операція реєстрації користувача
 */
export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      // Відправляємо запит на реєстрацію
      const res = await axios.post("/users/signup", credentials);
      // Встановлюємо токен у заголовки для подальших запитів
      setAuthHeader(res.data.token);
      return res.data; // Повертаємо відповідь від сервера
    } catch (error) {
      // В разі помилки повертаємо повідомлення про помилку
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/*
 * POST @ /users/login
 * body: { email, password }
 * Операція логіну користувача
 */
export const logIn = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      // Відправляємо запит на логін
      const res = await axios.post("/users/login", credentials);
      // Встановлюємо токен у заголовки
      setAuthHeader(res.data.token);
      return res.data; // Повертаємо відповідь від сервера
    } catch (error) {
      // В разі помилки повертаємо повідомлення про помилку
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/*
 * POST @ /users/logout
 * headers: Authorization: Bearer token
 * Операція виходу з системи
 */
export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    // Відправляємо запит на вихід
    await axios.post("/users/logout");
    // Видаляємо токен із заголовків
    clearAuthHeader();
  } catch (error) {
    // В разі помилки повертаємо повідомлення про помилку
    return thunkAPI.rejectWithValue(error.message);
  }
});

/*
 * GET @ /users/current
 * headers: Authorization: Bearer token
 * Операція для отримання інформації про поточного користувача (оновлення користувача)
 */
export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState(); // Отримуємо поточний стан Redux

    try {
      // Встановлюємо токен із збереженого стану
      setAuthHeader(state.auth.token);
      // Відправляємо запит на отримання поточного користувача
      const resp = await axios.get("/users/current");
      return resp.data; // Повертаємо дані користувача
    } catch (error) {
      // В разі помилки повертаємо повідомлення про помилку
      return thunkAPI.rejectWithValue(error.message);
    }
  },
  {
    // Виконуємо перевірку перед виконанням запиту
    condition: (_, thunkAPI) => {
      const state = thunkAPI.getState();
      // Якщо токен відсутній, запит не виконується
      return state.auth.token !== null;
    },
  }
);

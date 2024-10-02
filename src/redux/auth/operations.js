import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Налаштування базової URL-адреси для бекенду
axios.defaults.baseURL = "https://connections-api.goit.global/";

// ** Додаємо JWT до заголовків
export const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// ** Видаляємо JWT із заголовків
export const clearAuthHeader = () => {
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
      const res = await axios.post("/users/signup", credentials);
      const token = res.data.token;
      setAuthHeader(token); // Встановлюємо токен після реєстрації
      return res.data;
    } catch (error) {
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
  "auth/logIn",
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post("/users/login", credentials);
      const token = res.data.token;
      setAuthHeader(token); // Встановлюємо токен після логіну
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/*
 * POST @ /users/logout
 * headers: Authorization: Bearer token
 * Операція виходу з системи
 */
export const logOut = createAsyncThunk("auth/logOut", async (_, thunkAPI) => {
  try {
    await axios.post("/users/logout");
    clearAuthHeader(); // Видаляємо токен після логауту
  } catch (error) {
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
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;
      setAuthHeader(token); // Встановлюємо токен
      const resp = await axios.get("/users/current");
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
  {
    condition: (_, thunkAPI) => {
      const state = thunkAPI.getState();
      // Якщо токену немає, не робимо запит
      return state.auth.token !== null;
    },
  }
);

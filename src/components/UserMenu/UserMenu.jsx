// src/components/UserMenu/UserMenu.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/auth/operations";
import { selectUser } from "../../redux/auth/selectors";
import css from "./UserMenu.module.css"; // Зміна імпорту на css

export const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser); // Отримуємо дані користувача

  const handleLogout = () => {
    dispatch(logOut()); // Викликаємо функцію для виходу
  };

  return (
    <div className={css.userMenu}> {/* Використання css для стилізації */}
      <span className={css.welcome}>Welcome, {user.name}</span>
      <button type="button" onClick={handleLogout} className={css.logoutButton}>
        Logout
      </button>
    </div>
  );
};

// src/components/Navigation/Navigation.jsx
import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors"; // Імпорт селектора

export const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn); // Отримуємо статус авторизації

  return (
    <nav>
      <NavLink className={css.link} to="/">
        Home
      </NavLink>
      {isLoggedIn === true && ( // Умовний рендеринг для залогінених користувачів
        <NavLink className={css.link} to="/contacts">
          Contacts
        </NavLink>
      )}
    </nav>
  );
};

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/auth/operations";
import { selectUser } from "../../redux/auth/selectors";
import css from "./UserMenu.module.css";

export const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <div className={css.userMenu}>
      {" "}
      {}
      <span className={css.welcome}>Welcome, {user.name}</span>
      <button type="button" onClick={handleLogout} className={css.logoutButton}>
        Logout
      </button>
    </div>
  );
};

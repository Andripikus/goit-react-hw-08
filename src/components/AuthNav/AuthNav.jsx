// src/components/AuthNav/AuthNav.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import css from "./AuthNav.module.css";

export const AuthNav = () => (
  <div className={css.authNav}>
    <NavLink to="/register" className={css.link}>
      Register
    </NavLink>
    <NavLink to="/login" className={css.link}>
      Login
    </NavLink>
  </div>
);

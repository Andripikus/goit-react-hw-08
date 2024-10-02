import React from "react";
import css from "./HomePage.module.css"; // Імпорт модульного CSS з ім'ям css

const HomePage = () => (
  <div className={css.container}>
    <h1 className={css.title}>Welcome to the Phonebook App</h1>
    <p>Manage your contacts easily and securely.</p>
  </div>
);

export default HomePage;

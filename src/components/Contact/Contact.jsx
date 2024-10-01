import React from "react";
import css from "./Contact.module.css";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contacts/operations";

export default function Contact({ contact: { name, number, id } }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteContact(id));
  };

  return (
    <li className={css.contactItem}>
      <div className={css.contactInfo}>
        <span>{name}</span>
      </div>
      <div className={css.contactInfo}>
        <span>{number}</span>
      </div>
      <button className={css.button} onClick={handleDelete}>
        Delete
      </button>
    </li>
  );
}

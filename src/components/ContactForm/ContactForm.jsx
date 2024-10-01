import React from "react";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contacts/operations";
import { nanoid } from "nanoid";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./ContactForm.module.css";

export default function ContactForm() {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name must be less than 50 characters")
      .required("Name is required"),
    number: Yup.string()
      .matches(
        /^[0-9]{3}-[0-9]{2}-[0-9]{2}$/,
        "Invalid phone number format. Use xxx-xx-xx."
      )
      .required("Phone number is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    dispatch(
      addContact({ id: nanoid(), name: values.name, number: values.number })
    );
    resetForm();
  };

  return (
    <Formik
      initialValues={{ name: "", number: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form className={css.form}>
          <label className={css.label} htmlFor="name">
            Name:
          </label>
          <Field
            id="name"
            className={`${css.input} ${
              errors.name && touched.name ? css.errorInput : ""
            }`}
            name="name"
            type="text"
            placeholder="Enter contact name"
          />
          <ErrorMessage className={css.error} name="name" component="span" />
          <label className={css.label} htmlFor="number">
            Number:
          </label>
          <Field
            id="number"
            className={`${css.input} ${
              errors.number && touched.number ? css.errorInput : ""
            }`}
            name="number"
            type="text"
            placeholder="Enter phone number (xxx-xx-xx)"
          />
          <ErrorMessage className={css.error} name="number" component="span" />
          <button className={css.button} type="submit">
            Add contact
          </button>
        </Form>
      )}
    </Formik>
  );
}

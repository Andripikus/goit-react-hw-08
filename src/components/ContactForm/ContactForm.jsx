import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addContact } from "../../redux/contacts/operations";
import { selectAuthToken } from "../../redux/auth/selectors";
import css from "./ContactForm.module.css";

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be less than 50 characters")
    .required("Name is required"),
  number: Yup.string()
    .matches(
      /^[0-9]{3}-[0-9]{2}-[0-9]{2}$/,
      "Invalid phone number format. Use XXX-XX-XX"
    )
    .required("Phone number is required"),
});

export default function ContactForm() {
  const dispatch = useDispatch();
  const token = useSelector(selectAuthToken);

  const handleSubmit = (values, { resetForm }) => {
    if (!token) {
      console.error("No token available");
      return;
    }

    dispatch(addContact(values))
      .unwrap()
      .then(() => {
        console.log("Contact added successfully");
        resetForm();
      })
      .catch((error) => {
        console.error("Error adding contact:", error);
      });
  };

  return (
    <Formik
      initialValues={{ name: "", number: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form className={css.form}>
          <label className={css.label}>
            Name:
            <Field
              type="text"
              name="name"
              className={`${css.input} ${
                touched.name && errors.name ? css.errorInput : ""
              }`}
            />
            <ErrorMessage
              name="name"
              component="span"
              className={css.errorText}
            />
          </label>
          <label className={css.label}>
            Number:
            <Field
              type="text"
              name="number"
              className={`${css.input} ${
                touched.number && errors.number ? css.errorInput : ""
              }`}
            />
            <ErrorMessage
              name="number"
              component="span"
              className={css.errorText}
            />
          </label>
          <button className={css.submitBtn} type="submit">
            Add contact
          </button>
        </Form>
      )}
    </Formik>
  );
}

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { logIn } from "../../redux/auth/operations";
import { selectAuthError } from "../../redux/auth/selectors";
import css from "./LoginForm.module.css";

const LoginForm = () => {
  const dispatch = useDispatch();
  const error = useSelector(selectAuthError);

  const initialValues = {
    email: "",
    password: "",
  };

  const loginFormValidationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required!"),
    password: Yup.string()
      .required("Password is required!")
      .min(8, "Password must contain at least 8 characters")
      .max(100, "Password must be less than 100 characters"),
  });

  const handleFormSubmit = (values, actions) => {
    dispatch(logIn(values))
      .unwrap()
      .then(() => {
        actions.resetForm();
      })
      .catch((error) => {
        console.error("Login error:", error);
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleFormSubmit}
      validationSchema={loginFormValidationSchema}
    >
      <Form className={css.form}>
        <label className={css.label}>
          Email
          <Field
            type="text"
            name="email"
            placeholder="test.example@gmail.com"
            className={css.input}
          />
          <ErrorMessage
            className={css.errorText}
            name="email"
            component="span"
          />
        </label>

        <label className={css.label}>
          Password
          <Field
            type="password"
            name="password"
            placeholder="Enter your password"
            className={css.input}
          />
          <ErrorMessage
            className={css.errorText}
            name="password"
            component="span"
          />
        </label>

        <button className={css.btn} type="submit">
          Log In
        </button>

        {error && (
          <div className={css.errorText}>
            Oops, some error occurred... {error}
          </div>
        )}
      </Form>
    </Formik>
  );
};

export default LoginForm;

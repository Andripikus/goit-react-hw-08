// src/components/LoginForm/LoginForm.jsx
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./LoginForm.module.css"; // Імпорт стилів
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../../redux/auth/operations";
import { selectAuthError } from "../../redux/auth/selectors"; // Імпорт селектора помилки

const LoginForm = () => {
  const dispatch = useDispatch();
  const error = useSelector(selectAuthError); // Отримання помилки з Redux

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

  const handleFormSubmit = (values) => {
    dispatch(logIn(values)); // Відправка даних для логіну
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleFormSubmit}
      validationSchema={loginFormValidationSchema}
    >
      <Form className={css.form}>
        <label className={css.label}>
          <span>Email</span>
          <Field
            type="text"
            name="email"
            placeholder="test.example@gmail.com"
          />
          <ErrorMessage
            className={css.errorText}
            name="email"
            component="span"
          />
        </label>

        <label className={css.label}>
          <span>Password</span>
          <Field
            type="password"
            name="password"
            placeholder="Enter your password"
          />
          <ErrorMessage
            className={css.errorText}
            name="password"
            component="span"
          />
        </label>

        <button className={css.submitBtn} type="submit">
          Log In
        </button>
        {error && (
          <p className={css.errorText}>Oops, some error occurred... {error}</p>
        )}
      </Form>
    </Formik>
  );
};

export default LoginForm;

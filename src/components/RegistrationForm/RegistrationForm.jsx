import { Field, Form, Formik, ErrorMessage } from "formik";
import { useId } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { register } from "../../redux/auth/operations";
import { selectAuthError } from "../../redux/auth/selectors"; // Для обробки помилок
import css from "./RegistrationForm.module.css";

// Схема валідації через Yup
const RegisterFormValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required!")
    .min(2, "Name is too short!")
    .max(50, "Name is too long!"),
  email: Yup.string().email("Invalid email").required("Email is required!"),
  password: Yup.string()
    .required("Password is required!")
    .min(8, "Password must contain at least 8 characters")
    .max(100, "Password must be less than 100 characters"),
});

export const RegistrationForm = () => {
  const dispatch = useDispatch();
  const error = useSelector(selectAuthError); // Отримання помилки з Redux

  const initialValues = { name: "", email: "", password: "" };

  const nameFieldId = useId();
  const emailFieldId = useId();
  const passwordFieldId = useId();

  const handleRegister = (values, actions) => {
    dispatch(register(values))
      .unwrap()
      .then(() => {
        actions.resetForm(); // Скидання форми після успішної реєстрації
      })
      .catch((err) => {
        console.error("Registration error:", err);
        alert(err); // Виведення помилки користувачеві
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleRegister}
      validationSchema={RegisterFormValidationSchema} // Підключення схеми валідації
    >
      <Form className={css.form}>
        <label htmlFor={nameFieldId} className={css.label}>
          Name
        </label>
        <Field
          type="text"
          name="name"
          id={nameFieldId}
          autoComplete="off"
          className={css.input}
        />
        <ErrorMessage name="name" component="div" className={css.errorText} />

        <label htmlFor={emailFieldId} className={css.label}>
          Email
        </label>
        <Field
          type="email"
          name="email"
          id={emailFieldId}
          autoComplete="off"
          className={css.input}
        />
        <ErrorMessage name="email" component="div" className={css.errorText} />

        <label htmlFor={passwordFieldId} className={css.label}>
          Password
        </label>
        <Field
          type="password"
          name="password"
          id={passwordFieldId}
          className={css.input}
        />
        <ErrorMessage name="password" component="div" className={css.errorText} />

        <button className={css.btn} type="submit">
          Register
        </button>
        {error && <div className={css.errorText}>Oops, {error}</div>}
      </Form>
    </Formik>
  );
};

export default RegistrationForm;

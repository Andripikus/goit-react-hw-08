// src/components/RestrictedRoute.jsx
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors"; // Імпорт селектора
import { Navigate } from "react-router-dom";

const RestrictedRoute = ({ component, redirectTo }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn); // Отримання статусу авторизації

  return isLoggedIn === true ? <Navigate to={redirectTo} /> : component; // Умовний рендеринг
};

export default RestrictedRoute; // Експорт за замовчуванням

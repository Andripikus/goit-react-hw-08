// src/components/PrivateRoute.jsx
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ component, redirectTo }) => {
  const isLogged = useSelector(selectIsLoggedIn);

  return isLogged === true ? component : <Navigate to={redirectTo} />;
};

export default PrivateRoute; // Додаємо експорт за замовчуванням

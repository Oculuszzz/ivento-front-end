import { Navigate } from "react-router-dom";
import useAuthContext from "../context/Auth-context";

const PrivateRoute = ({ children }) => {
  const { authState } = useAuthContext();

  return authState.isLoggedIn ? children : <Navigate to="/" />;
};

export default PrivateRoute;

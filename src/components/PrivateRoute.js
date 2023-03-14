import AuthContext from "../context/Auth-context";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import TokenService from "../services/TokenService";

const PrivateRoute = ({ children }) => {
  const authCtx = useContext(AuthContext);

  if (authCtx.isLoading && TokenService.isUserExisted) {
    return;
  }

  // not logged in so redirect to login page with the return url
  // authorized so return child components
  return authCtx.isLoggedIn ? children : <Navigate to="/" />;
};

export default PrivateRoute;

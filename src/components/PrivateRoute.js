import { Navigate } from "react-router-dom";
import useAuthContext from "../context/Auth-context";

const PrivateRoute = ({ isAllowed, children }) => {
  const { authState } = useAuthContext();

  return authState.isLoggedIn && isAllowed ? children : <Navigate to="/" />;
};

export default PrivateRoute;

import { useEffect } from "react";
import useAuthContext from "../context/Auth-context";

const AuthWrapper = ({ children }) => {
  const { authState, setAuthState } = useAuthContext();

  useEffect(() => {
    const localUser = localStorage.getItem("user");

    if (localUser !== null && localUser !== "undefined") {
      setAuthState((prevState) => ({
        ...prevState,
        isLoggedIn: true,
        isLoading: false,
      }));
    } else {
      setAuthState((prevData) => ({
        ...prevData,
        isLoggedIn: false,
        isLoading: false,
      }));
    }
  }, [setAuthState]);

  // wait until auth completely initialize
  if (authState.isLoading) {
    return;
  }

  return <>{children}</>;
};

export default AuthWrapper;

import { useEffect } from "react";
import useAuthContext from "../context/Auth-context";

const AuthWrapper = ({ children }) => {
  const { authState, setAuthState } = useAuthContext();

  useEffect(() => {
    const localHackerUser = localStorage.getItem("user");

    if (localHackerUser !== null && localHackerUser !== "undefined") {
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
  }, []);

  // wait until auth completely initialize
  if (authState.isLoading) {
    return;
  }

  return <>{children}</>;
};

export default AuthWrapper;

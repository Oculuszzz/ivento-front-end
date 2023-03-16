import React, { useState, useContext } from "react";

const initialAuthState = { isLoggedIn: false, isLoading: true };

const AuthContext = React.createContext();

const useAuthContext = () => useContext(AuthContext); // to avoid importing both usecontext as well as Authcontext, we can simply import just useAuthContext where we need authcontext

// Create default Context Provider function where can be import by other components
export const AuthContextProvider = ({ children }) => {
  const [authState, setAuthState] = useState(initialAuthState);

  return (
    <AuthContext.Provider
      value={{ authState: authState, setAuthState: setAuthState }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default useAuthContext;

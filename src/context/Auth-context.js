import React, { useState, useEffect } from "react";
import { axiosInstance } from "../services/AxiosService";

const AuthContext = React.createContext({
  isLoggedIn: false,
  isLoading: false,
  onLogout: () => {}, // Set default function
  onLogin: (username, password) => {}, // Set default function
});

// Create default Context Provider function where can be import by other components
export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    const userLoggedInInformation = localStorage.getItem("user");
    if (userLoggedInInformation) {
      setIsLoggedIn(true);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (
      !username ||
      username.trim().length === 0 ||
      !password ||
      password.trim().length === 0
    ) {
      return;
    }

    setIsLoading(true);

    const abortController = new AbortController(); // To associate with useEffect to stop Web request

    axiosInstance.service
      .post("/authenticate", { username, password })
      .then((response) => {
        // handle success
        if (!response.status === 200) {
          throw Error(`Error - ${response.status} - ${response.statusText}`);
        } else {
          return response.data;
        }
      })
      .then((data) => {
        // update state of data
        if (data.accessToken) {
          localStorage.setItem("user", JSON.stringify(data));
        }
        setIsLoggedIn(true);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("Fecth abort error");
        } else {
          setIsLoading(false);
        }

        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      });

    // Clear/cancel the request
    return () => {
      abortController.abort();
    };
  }, [username, password]);

  const logoutHandler = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  const loginHandler = (username, password) => {
    setUsername(username);
    setPassword(password);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        isLoading: isLoading,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

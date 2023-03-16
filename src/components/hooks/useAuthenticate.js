import { useCallback, useEffect, useState } from "react";
import { axiosInstance } from "../../services/AxiosService";

const useSignin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [triggerApi, setTriggerApi] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const trigger = useCallback((trigger, username = "", password = "") => {
    setUsername(username);
    setPassword(password);
    setTriggerApi(trigger);
  }, []);

  useEffect(() => {
    const abortController = new AbortController(); // To associate with useEffect to stop Web request

    // Only run signin api if triggerApi is TRUE
    if (triggerApi) {
      setIsLoading(true);

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
            setIsLoggedIn(true);
            setError(undefined);
          }
          setIsLoading(false);
        })
        .catch((error) => {
          if (error.name === "AbortError") {
            console.log("Fecth abort error");
          } else {
            setIsLoggedIn(false);
            setIsLoading(false);
          }

          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);

            setError(error.response.data);
          } else if (error.request) {
            console.log(error.request);
            setError(error.request);
          } else {
            setError(error.message);
            console.log("Error", error.message);
          }
        });

      // Clear/cancel the request
      return () => {
        abortController.abort();
      };
    }
  }, [username, password, triggerApi]);

  return { isLoggedIn, isLoading, error, trigger };
};

const useAuthenticate = { useSignin };

export default useAuthenticate;

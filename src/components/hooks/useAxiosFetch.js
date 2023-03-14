import { useEffect, useState } from "react";
import AuthHeader from "../../services/AuthHeader";
import { axiosInstance } from "../../services/AxiosService";

const useAxiosFetch = (url) => {
  const [data, setData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const abortController = new AbortController();

    // Make a request for a user with a given ID
    axiosInstance.service
      .get(url, { headers: AuthHeader() })
      .then((response) => {
        // Do a checker from the response
        if (!response.status === 200) {
          throw Error(`Error - ${response.status} - ${response.statusText}`);
        } else {
          return response.data;
        }
      })
      .then((data) => {
        // update state of data
        setError(null);
        setData(data);
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
      })
      .finally(function () {
        // always executed
      });

    // Clear/cancel the request
    return () => {
      abortController.abort();
    };
  }, [url]);

  return { data, isLoading, error };
};

export default useAxiosFetch;

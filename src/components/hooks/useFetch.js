import { useState, useEffect } from "react";

const useFetch = (url, dispatch) => {
  const [data, setData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController(); // To associate with useEffect to stop Web request

    fetch(url, { signal: abortController.signal })
      .then((response) => {
        // Do a checker from the response
        console.log(response.status + " - " + response.statusText);
        if (response.ok) {
          return response.json();
        } else {
          throw Error(response.status + " - " + response.statusText);
        }
      })
      .then((data) => {
        // update state of data
        setError(null);
        setData(data);
        setIsLoading(false);

        // Perform dispatch (useReducer)
        if (dispatch) {
          dispatch({ type: "API_RETRIEVED_VALUES", values: data });
        }
      })
      .catch((error) => {
        // Catch the error
        if (error.name === "AbortError") {
          console.log("Fecth abort error");
        } else {
          setError(error.message);
          setIsLoading(false);
        }
      });

    // Clean up useEffect
    return () => {
      abortController.abort();
    };
  }, [url, dispatch]);

  return { data, isLoading, error };
};

export default useFetch;

import useSWR from "swr";
import axios from "axios";
import { useState, useEffect } from "react";

const useFetch = (config, { immediate }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetcher = axios(config)
    .then(function (response) {
      setData(response.data);
    })
    .catch(function (error) {
      setError(error);
    });

  const executeFetch = useSWR(config.url, fetcher);

  const responseData = {
    user: data,
    isLoading: !error && !data,
    isError: error,
    executeFetch,
  };
  useEffect(() => {
    if (immediate) {
      executeFetch();
    }
  }, [executeFetch, immediate]);

  return responseData;
};

export default useFetch;

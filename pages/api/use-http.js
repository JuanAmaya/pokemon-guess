import { useCallback } from "react";

const useHttp = () => {
  const sendRequest = useCallback(async (requestConfig, applyData) => {
    try {
      console.log("lionk", requestConfig.url);
      const response = await fetch(requestConfig.url, applyData);
      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();

      applyData(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return {
    sendRequest,
  };
};

export default useHttp;

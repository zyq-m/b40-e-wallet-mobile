import instanceAxios from "../lib/instanceAxios";
import { useState, useEffect } from "react";

export const useCafe = ({ id, student }) => {
  const [cafe, setCafe] = useState([]);
  const controller = new AbortController();

  const getCafeById = async signal => {
    try {
      const response = await instanceAxios.get(`/api/cafe/${id}`, {
        signal: signal,
      });

      setCafe(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    !student && getCafeById(controller.signal);

    return () => {
      controller.abort();
    };
  }, []);

  return { cafe };
};

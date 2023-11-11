import { api } from "../services/axiosInstance";
import { useState, useEffect } from "react";

export const useCafe = ({ id, student }) => {
  const [cafe, setCafe] = useState([]);

  const getCafeById = async (signal) => {
    try {
      const response = await api.get(`/api/cafe/${id}`, {
        signal: signal,
      });

      setCafe(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    !student && getCafeById(controller.signal);

    return () => {
      controller.abort();
    };
  }, []);

  return { cafe };
};

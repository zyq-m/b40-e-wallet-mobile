import axios from "axios";
import { useState, useEffect } from "react";
import instanceAxios from "../lib/instanceAxios";

export const useTransaction = ({ id, student, refresh }) => {
  const [transactions, setTransactions] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const controller = new AbortController();

  const getTransactionById = () => {
    instanceAxios
      .get(`/api/transactions/${student ? `students` : `cafe`}/${id}`, {
        signal: controller.signal,
      })
      .then(res => {
        setTransactions(res.data);
      })
      .then(() => setLoading(false))
      .catch(err => {
        if (axios.isCancel(err)) {
          setError("Try refresh again");
          setLoading(true);
        }
        console.warn(err);
      });
  };

  useEffect(() => {
    getTransactionById();

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (refresh) {
      getTransactionById(controller.signal);
    }

    return () => {
      controller.abort();
    };
  }, [refresh]);

  return { transactions, setTransactions, loading, error };
};

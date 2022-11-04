import axios from "axios";
import { useState, useEffect } from "react";

import { useTriggerRefresh } from "./useTriggerRefresh";
import instanceAxios from "../lib/instanceAxios";

export const useTransaction = ({ id, student, refresh }) => {
  const [transactions, setTransactions] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { trigger } = useTriggerRefresh(refresh);

  const getTransactionById = signal => {
    instanceAxios
      .get(`/api/transactions/${student ? `students` : `cafe`}/${id}`, {
        signal: signal,
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
      });
  };

  useEffect(() => {
    const controller = new AbortController();
    getTransactionById(controller.signal);

    return () => {
      controller.abort();
    };
  }, [trigger]);

  return { transactions, setTransactions, loading, error };
};

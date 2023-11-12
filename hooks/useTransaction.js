import axios from "axios";
import { useState, useEffect } from "react";

import { useTriggerRefresh } from "./useTriggerRefresh";
import { api } from "../services/axiosInstance";

export const useTransaction = ({ id, role, refresh }) => {
  const [transactions, setTransactions] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { trigger } = useTriggerRefresh(refresh);

  const getTransactionById = async (signal) => {
    let url = "";
    if (role === "CAFE") {
      url = `/cafe/transaction/${id}`;
    }
    if (role === "B40") {
      url = `/student/transaction/wallet/${id}`;
    }

    try {
      const res = await api.get(url, {
        signal: signal,
      });

      setTransactions(res.data.data);
      setLoading(false);
    } catch (error) {
      if (axios.isCancel(error)) {
        setError("Try refresh again");
        setLoading(true);
      }
      setError("No transaction found");
    }
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

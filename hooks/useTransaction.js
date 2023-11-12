import axios from "axios";
import { useState, useEffect } from "react";

import { api } from "../services/axiosInstance";
import { useUserContext } from "./useUserContext";

export const useTransaction = () => {
  const [transactions, setTransactions] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useUserContext();

  const getTransactionById = async (signal) => {
    let url = "";
    if (user.role === "CAFE") {
      url = `/cafe/transaction/${user.id}`;
    }
    if (user.role === "B40") {
      url = `/student/transaction/wallet/${user.id}`;
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
  }, [user.transaction?.refresh]);

  return { transactions, setTransactions, loading, error };
};

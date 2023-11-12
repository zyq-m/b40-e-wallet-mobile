import axios from "axios";
import { useState, useEffect } from "react";

import { api } from "../services/axiosInstance";
import { useUserContext } from "./useUserContext";
import { useTriggerRefresh } from "./useTriggerRefresh";

export const useTransaction = () => {
  const [transactions, setTransactions] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useUserContext();
  const { trigger } = useTriggerRefresh(user.transaction?.refresh);

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
  }, [trigger]);

  return { transactions, setTransactions, loading, error };
};

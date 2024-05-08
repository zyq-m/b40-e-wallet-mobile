import { useState, useEffect } from "react";
import moment from "moment";

import { api } from "../services/axiosInstance";
import { useUserContext } from "./useUserContext";
import { useTriggerRefresh } from "./useTriggerRefresh";

export const useTransaction = (params) => {
  const { user } = useUserContext();
  const { trigger } = useTriggerRefresh(user.transaction?.refresh);
  const [transactions, setTransactions] = useState({ data: [] });
  const [list, setList] = useState([
    {
      id: 0,
      label: "All",
      checked: false,
      api: async (signal) => await api.get(getApiUrl().all, { signal }),
    },
    {
      id: 1,
      label: "Today",
      checked: true,
      api: async (signal) => await api.get(getApiUrl().today, { signal }),
    },
    {
      id: 2,
      label: "Week",
      checked: false,
      api: async (signal) => await api.get(getApiUrl().week, { signal }),
    },
    {
      id: 3,
      label: "Month",
      checked: false,
      api: async (signal) => await api.get(getApiUrl().month, { signal }),
    },
  ]);

  const onList = (id) => {
    return setList((prev) =>
      prev.map((data) => {
        if (data.id === id) {
          data
            .api()
            .then((res) => {
              setTransactions(res.data);
            })
            .catch(() => {
              setTransactions({ data: [] });
            });
          return { ...data, checked: true };
        } else {
          return { ...data, checked: false };
        }
      })
    );
  };

  const initLoad = async (signal) => {
    const toLoad = list.filter((val) => val.checked === true);
    const data = await toLoad[0].api(signal);

    setTransactions(data.data);
  };

  const getApiUrl = () => {
    if (params?.loyalty) {
      return {
        all: `/student/transaction/point/${user.id}`,
        today: `/student/transaction/point/${moment().format(
          "YYYY-MM-DD"
        )}/${moment().format("YYYY-MM-DD")}/${user.id}`,
        week: `/student/transaction/point/${moment()
          .weekday(0)
          .format("YYYY-MM-DD")}/${moment().weekday(6).format("YYYY-MM-DD")}/${
          user.id
        }`,
        month: `/student/transaction/point/${moment()
          .startOf("month")
          .format("YYYY-MM-DD")}/${moment()
          .endOf("month")
          .format("YYYY-MM-DD")}/${user.id}`,
      };
    }

    if (user.role === "CAFE") {
      return {
        all: `/cafe/transaction/${user.id}`,
        today: `/cafe/transaction/${moment().format(
          "YYYY-MM-DD"
        )}/${moment().format("YYYY-MM-DD")}/${user.id}`,
        week: `/cafe/transaction/${moment()
          .weekday(0)
          .format("YYYY-MM-DD")}/${moment().weekday(6).format("YYYY-MM-DD")}/${
          user.id
        }`,
        month: `/cafe/transaction/${moment()
          .startOf("month")
          .format("YYYY-MM-DD")}/${moment()
          .endOf("month")
          .format("YYYY-MM-DD")}/${user.id}`,
      };
    }

    if (["B40", "MAIDAM", "PAYNET"].includes(user.role)) {
      return {
        all: `/student/transaction/wallet/${user.id}`,
        today: `/student/transaction/wallet/${moment().format(
          "YYYY-MM-DD"
        )}/${moment().format("YYYY-MM-DD")}/${user.id}`,
        week: `/student/transaction/wallet/${moment()
          .weekday(0)
          .format("YYYY-MM-DD")}/${moment().weekday(6).format("YYYY-MM-DD")}/${
          user.id
        }`,
        month: `/student/transaction/wallet/${moment()
          .startOf("month")
          .format("YYYY-MM-DD")}/${moment()
          .endOf("month")
          .format("YYYY-MM-DD")}/${user.id}`,
      };
    }
  };

  function resetList() {
    setList((prev) => prev.map((val) => ({ ...val, checked: false })));
  }

  useEffect(() => {
    const controller = new AbortController();
    initLoad(controller.signal);

    return () => {
      controller.abort();
    };
  }, [trigger]);

  return { transactions, list, onList, setTransactions, resetList };
};

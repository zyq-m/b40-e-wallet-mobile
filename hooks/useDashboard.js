import { useEffect, useState } from "react";
import { socket } from "../services/socket";
import { api } from "../services/axiosInstance";

import { useUserContext } from "./useUserContext";
import { useTriggerRefresh } from "./useTriggerRefresh";

export const useDashboard = () => {
  const [dashboard, setDashboard] = useState();
  const { user } = useUserContext();
  const { trigger } = useTriggerRefresh(user.dashboard?.refresh);

  const defineRole = async () => {
    if (user.role !== "CAFE") {
      api
        .get(`/student/${user?.id}`)
        .then((res) => {
          setDashboard((prev) => ({
            ...prev,
            name: res.data.student.user.profile.name,
          }));
        })
        .catch((err) => {
          console.error(err);
        });
    }

    if (user.role === "NON-B40") {
      socket.emit("student:get-point-total", { matricNo: user?.id });
      socket.on("student:get-point-total", (res) => {
        setDashboard((prev) => ({
          ...prev,
          total: `${res.point?.total || 0}pt`,
          transaction: res.transaction.transaction,
        }));
      });
    }

    if (user.role === "B40") {
      socket.emit("student:get-wallet-total", { matricNo: user?.id });
      socket.on("student:get-wallet-total", (res) => {
        setDashboard((prev) => ({
          ...prev,
          total: `RM${res.coupon.total}`,
          transaction: res.transaction.transaction,
        }));
      });
    }

    if (user.role === "CAFE") {
      api
        .get(`/cafe/${user?.id}`)
        .then((res) => {
          setDashboard((prev) => ({
            ...prev,
            name: res.data.data.name,
          }));
        })
        .catch((e) => {
          console.log(e);
        });
      socket.emit("cafe:get-sales-total", { cafeId: user?.id });
      socket.on("cafe:get-sales-total", (res) => {
        setDashboard((prev) => ({
          ...prev,
          total: `RM${res.total}`,
          transaction: res.transaction.transaction,
        }));
      });
    }
  };

  useEffect(() => {
    defineRole();
  }, [socket, trigger]);

  return { dashboard };
};

import { useEffect, useState } from "react";
import { socket } from "../services/socket";
import { api } from "../services/axiosInstance";

import { useUserContext } from "./useUserContext";
import { useTriggerRefresh } from "./useTriggerRefresh";
import { usePushNotification } from "./usePushNotification";

export const useDashboard = () => {
  const [dashboard, setDashboard] = useState();
  const { schedulePushNotification } = usePushNotification();
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

    // if (user.role === "PAYNET") {
    //   socket.emit("student:get-point-total", { matricNo: user?.id });
    //   socket.on("student:get-point-total", (res) => {
    //     setDashboard((prev) => ({
    //       ...prev,
    //       total: `${res.point?.total || 0}pt`,
    //       transaction: res.transaction,
    //     }));
    //   });
    // }

    if (["B40", "MAIDAM", "PAYNET"].includes(user.role)) {
      socket.emit("student:get-wallet-total", {
        matricNo: user?.id,
        role: user.role,
      });
      socket.on("student:get-wallet-total", (res) => {
        setDashboard((prev) => ({
          ...prev,
          total: `RM${res.coupon.total}`,
          transaction: res.transaction,
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
      socket.emit("cafe:get-sales-total", {
        cafeId: user?.id,
        role: user.role,
      });
      socket.on("cafe:get-sales-total", (res) => {
        setDashboard((prev) => ({
          ...prev,
          total: `RM${res.total}`,
          transaction: res.transaction,
        }));
      });
    }
  };

  useEffect(() => {
    socket.emit("user:connect", { id: user.id });
    defineRole();
  }, [socket, trigger]);

  useEffect(() => {
    socket.on("notification:receiver", async (msg) => {
      await schedulePushNotification(msg);
    });

    return () => {
      socket.removeAllListeners();
    };
  }, []);

  return { dashboard };
};

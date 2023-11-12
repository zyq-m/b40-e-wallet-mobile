import { useEffect, useState } from "react";
import { socket } from "../services/socket";
import { api } from "../services/axiosInstance";
import { useUserContext } from "./useUserContext";

export const useDashboard = () => {
  const [dashboard, setDashboard] = useState();
  const { user } = useUserContext();

  const defineRole = async () => {
    if (user.role === "B40") {
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

      socket.emit("student:get-wallet-total", { matricNo: user?.id });
      socket.on("student:get-wallet-total", (res) => {
        setDashboard((prev) => ({
          ...prev,
          total: `RM${res.coupon.total}`,
          transaction: res.transaction.transaction,
        }));
        console.log(res);
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
        console.log(res);
      });
    }
  };

  useEffect(() => {
    defineRole();
  }, [socket]);

  return { dashboard };
};

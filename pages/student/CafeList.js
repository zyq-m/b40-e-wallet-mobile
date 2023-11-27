import { useEffect, useState } from "react";
import { View } from "react-native";
import { RadioButton } from "react-native-radio-buttons-group";
import { Button, Refresh } from "../../components";

import { useUserContext } from "../../hooks";
import { popupMessage } from "../../utils/popupMessage";
import { api } from "../../services/axiosInstance";
import { pay } from "../../api/student/studentApi";
import { socket } from "../../services/socket";

import { globals } from "../../styles";

const CafeList = ({ navigation, route }) => {
  const { amount, pointId } = route.params;
  const { user } = useUserContext();

  const [radioBtn, setRadioBtn] = useState([]);
  const [selectedCafe, setSelectedCafe] = useState("");

  const onSelected = (i) =>
    setRadioBtn((prev) =>
      prev.map((data) => {
        if (data.id == i) {
          setSelectedCafe({ id: data.value, name: data.label });
          return { ...data, selected: true };
        } else {
          return { ...data, selected: false };
        }
      })
    );

  const onConfirm = async () => {
    if (!selectedCafe) {
      return popupMessage({
        title: "Error",
        message: "Please select a cafe",
      });
    }

    // Collect Point
    if (route.params?.loyalty) {
      return navigation.navigate("Insert Pin", {
        amount: amount,
        cafeId: selectedCafe.id,
        pointId: pointId,
      });
    }

    try {
      await pay(user.id, selectedCafe.id, amount);

      // emit event
      socket.emit("student:get-wallet-total", { matricNo: user?.id });
      socket.emit("admin:get-overall");

      // push notification then nav to dashboard
      popupMessage({ title: "Success", message: "Payment successful👍" });
      navigation.navigate("Dashboard");
    } catch (error) {
      console.error(error);
      if (error.response.status == 406) {
        popupMessage({
          title: "Failed",
          message: error.response.data.message,
        });
      }
    }

    // if (selectedCafe) {
    //   ws.emit("pay", selectedCafe.id, user.id, amount);
    //   ws.on("pay_detail", (res) => {
    //     if (!res) {
    //       return;
    //     }
    //     ws.emit("get_student", user.id);
    //     ws.emit("get_transaction_student", user.id);
    //     // TODO: update new data to only selected cafe
    //     ws.emit("get_transaction_cafe", selectedCafe.id);
    //     // TODO: set event to push notification
    //     ws.emit("send_notification", selectedCafe.id, {
    //       title: "Payment recieved",
    //       body: `You recieved RM${amount}.00 from ${user.details.name} - ${user.details.id}`,
    //     });
    //     ws.emit("send_notification", user.id, {
    //       title: "Payment sent",
    //       body: `You spent RM${amount}.00 at ${selectedCafe.name}`,
    //     });
    //     popupMessage({ title: "Success", message: "Payment successful👍" });
    //     navigation.navigate("Dashboard");
    //     // remove socket to avoid looping ascendingly
    //     ws.removeAllListeners("pay_detail");
    //   });
    // }
  };

  const fetchCafe = (signal) => {
    api
      .get("/student/cafe", { signal: signal })
      .then((res) => {
        let cafeList = res.data.data.map((data, i) => ({
          id: i,
          label: data.name,
          value: data.id,
          selected: false,
        }));

        setRadioBtn(cafeList);
      })
      .catch((e) => {
        console.log(e);
        popupMessage({
          title: "Error",
          message: "There's a problem please login again",
        });
      });
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchCafe(controller.signal);

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    user.cafeList.refresh && fetchCafe();
  }, [user.cafeList?.refresh]);

  return (
    <View style={[globals.container]}>
      <Refresh cafeList={true}>
        <View style={{ flex: 1, justifyContent: "center", marginVertical: 16 }}>
          {radioBtn.map(({ id, label, value, selected }) => {
            return (
              <RadioButton
                key={id}
                id={id}
                label={label}
                value={value}
                selected={selected}
                labelStyle={{ fontSize: 16 }}
                containerStyle={{ marginTop: 16 }}
                onPress={() => onSelected(id)}
              />
            );
          })}
        </View>
      </Refresh>
      <View style={{ paddingBottom: 24, paddingHorizontal: 16 }}>
        <Button label={"Confirm"} onPress={onConfirm} />
      </View>
    </View>
  );
};

export default CafeList;

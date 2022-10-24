import { useState, useCallback } from "react";
import { Platform, RefreshControl, ScrollView, View } from "react-native";
import { RefreshControl as WebRefreshControl } from "react-native-web-refresh-control";
import { useUserContext } from "../hooks";

const Refresh = ({ children, dashboard, transaction, cafeList }) => {
  const { setUser } = useUserContext();
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setUser(prev => {
      // refresh specific pages
      if (dashboard) {
        return { ...prev, dashboard: { refresh: true } };
      }
      if (transaction) {
        return { ...prev, transaction: { refresh: true } };
      }
      if (cafeList) {
        return { ...prev, cafeList: { refresh: true } };
      }
    });
    wait(2000).then(() => {
      setRefreshing(false);
      setUser(prev => {
        if (dashboard) {
          return { ...prev, dashboard: { refresh: false } };
        }
        if (transaction) {
          return { ...prev, transaction: { refresh: false } };
        }
        if (cafeList) {
          return { ...prev, cafeList: { refresh: false } };
        }
      });
    });
  }, []);

  if (Platform.OS === "web") {
    return (
      <ScrollView
        refreshControl={
          <WebRefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={{ paddingHorizontal: 16 }}>{children}</View>
      </ScrollView>
    );
  } else {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{ paddingHorizontal: 16 }}>
        {children}
      </ScrollView>
    );
  }
};

export default Refresh;

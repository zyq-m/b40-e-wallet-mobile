import { useState, useCallback } from "react";
import { Platform, RefreshControl, ScrollView, View } from "react-native";
import { RefreshControl as WebRefreshControl } from "react-native-web-refresh-control";
import { useUserContext } from "../hooks";

const Refresh = ({ children }) => {
  const { setUser } = useUserContext();
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setUser(prev => ({ ...prev, refresh: true }));
    wait(2000).then(() => {
      setRefreshing(false);
      setUser(prev => ({ ...prev, refresh: false }));
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

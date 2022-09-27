import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

export const save = async (key, value) => {
  if (Platform.OS === 'web') {
    return localStorage.setItem(key, value)
  } else {
    await SecureStore.setItemAsync(key, value);
  }
}

export const getValueFor = async key => {
  if (Platform.OS === 'web') {
    return localStorage.getItem(key)
  } else {
    return await SecureStore.getItemAsync(key);
  }
}

export const deleteItem = async key => {
  if (Platform.OS === 'web') {
    return localStorage.removeItem(key)
  } else {
    return await SecureStore.deleteItemAsync(key);
  }
}

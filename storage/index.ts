import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key: string, value: any) => {
  try {
    const stringData = JSON.stringify(value);
    await AsyncStorage.setItem(key, stringData);
  } catch (error: any) {
    console.log(error.message);
  }
};

export const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value != null) {
      const data = JSON.parse(value);
      return data;
    }
  } catch (error: any) {
    console.log(error.message);
  }
};

export const containsKey = async (key: string) => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    return (await keys).includes(key);
  } catch (error: any) {
    console.log(error.message);
  }
};

export const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error: any) {
    console.log(error.message);
  }
};

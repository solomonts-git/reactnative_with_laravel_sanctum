import * as SecureStore from 'expo-secure-store';
//const token=null;

export  const setToken=async (newToken)=>{
    await SecureStore.setItemAsync("token", newToken);
}

export const getToken = async ()=>{
    let result = await SecureStore.getItemAsync("token");
    if (result) {
      return result;
    } else {
      return null
    }
}
export const deleteToken = async ()=>{
    let result = await SecureStore.deleteItemAsync("token");
   
}
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosClient from "../utils/axiosClient";
import * as FileSystem from 'expo-file-system';

export const getUserOrders = async (filter,setData,setLoading) => {
    try {
        const userToken = await AsyncStorage.getItem('token');
        const response = await axiosClient.get(`/Order?${filter}`, {
          headers: {
              'Authorization': `Bearer ${userToken}`,
          },
        })
        setData(response.data)
        setLoading(false)
    } catch (error) {
        console.error(error)
        setLoading(false)
    }
  }
  export const getOrder = async (id, setData,setLoading) => {
    try {
        const userToken = await AsyncStorage.getItem('token');
        const response = await axiosClient.get(`/Order/${id}`, {
          headers: {
              'Authorization': `Bearer ${userToken}`,
          },
        })
        setData(response.data)
        setLoading(false)
    } catch (error) {
        console.error(error)
        setLoading(false)
    }
  }
  export const makeOrder = async (data,setLoading, setSuccess) => {
    try {
        const userToken = await AsyncStorage.getItem('token');
        const response = await axiosClient.post(`/User/Order`, data, {
          headers: {
              'Authorization': `Bearer ${userToken}`,
          },
        })
        if(response.status === 200 || response.status === 204){
            setSuccess(true)
        }else{
            setSuccess(false)
        }
        setLoading(false)
    } catch (error) {
        console.error(error)
        setLoading(false)
    }
  }
  const requestFileWritePermission =async () => {
    const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
    console.log(permissions.granted);
    if (!permissions.granted) {
        console.log('File write Permissions Denied!!')
        return {
            access: false,
            directoryUri: null
        };
    }
    return {
        access:true,
        directoryUri: permissions.directoryUri
    };
}
const saveReportFile = async (pdfData, directoryUri) => {
    try {
      await FileSystem.StorageAccessFramework.createFileAsync(directoryUri, 'My_file.pdf', 'application/pdf')
        .then(async (uri) => {
          const uint8Array = new Uint8Array(pdfData);
          const base64Data = uint8Array.reduce((data, byte) => data + String.fromCharCode(byte), '');
  
          await FileSystem.writeAsStringAsync(uri, base64Data, { encoding: FileSystem.EncodingType.Base64 });
        })
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (error) {
      console.log(error);
    }
  };
  export const getInvoice = async (id) => {
    try {
        console.log("hello");
        const userToken = await AsyncStorage.getItem('token');
        const response = await axiosClient.get(`/Order/Invoice?orderId=${id}`, {
          headers: {
              'Authorization': `Bearer ${userToken}`,
          },
          responseType: 'arraybuffer',
        })
        const pdfData = response.data
        const hasPermissions = await requestFileWritePermission();
        if (hasPermissions.access) {
            saveReportFile(pdfData, hasPermissions.directoryUri)
        }
    } catch (error) {
        console.log(error)
    }
  }
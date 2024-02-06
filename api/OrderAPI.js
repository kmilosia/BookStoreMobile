import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosClient from "../utils/axiosClient";
import * as FileSystem from 'expo-file-system';

export const getUserOrders = async (filter,setData,setLoading) => {
    try {
        const userToken = await AsyncStorage.getItem('token');
        const response = await axiosClient.get(`/User/Order?${filter}`, {
          headers: {
              'Authorization': `Bearer ${userToken}`,
          },
        })
        if (response.status === 200 || response.status === 204) {
        setData(response.data)
        }
        setLoading(false)
    } catch (error) {
        console.log(error)
        setLoading(false)
    }
  }
  export const getOrder = async (id, setData,setLoading) => {
    try {
        const userToken = await AsyncStorage.getItem('token');
        const response = await axiosClient.get(`/User/Order/${id}`, {
          headers: {
              'Authorization': `Bearer ${userToken}`,
          },
        })
        if (response.status === 200 || response.status === 204) {
        setData(response.data)
        }
        setLoading(false)
    } catch (error) {
        console.log(error)
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
        console.log(error)
        setLoading(false)
        setSuccess(false)
    }
  }
  const requestFileWritePermission = async () => {
    const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
    if (!permissions.granted) {
        console.log('Odmowa dostępu do plików urządzenia!')
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
const saveReportFile = async (base64Data, directoryUri) => {
  try {
    const uri = await FileSystem.StorageAccessFramework.createFileAsync(
      directoryUri,
      'invoice.pdf',
      'application/pdf'
    );

    await FileSystem.writeAsStringAsync(uri, base64Data, { encoding: FileSystem.EncodingType.Base64 });
    
    console.log('File saved successfully');
  } catch (error) {
    console.log(error);
  }
};
  export const getInvoice = async (id) => {
    try {
        const userToken = await AsyncStorage.getItem('token');
        console.log("got token");
        const response = await axiosClient.get(`/Order/InvTest?orderId=${id}`, {
          headers: {
              'Authorization': `Bearer ${userToken}`,
          },
          responseType: 'arraybuffer',
        })
        console.log(response.data);
        console.log("after response");
        const pdfData = response.data
        const hasPermissions = await requestFileWritePermission();
        console.log("request");
        if (hasPermissions.access) {
          console.log("saving");
            saveReportFile(pdfData, hasPermissions.directoryUri)
        }
    } catch (error) {
        console.log(error)
    }
  }
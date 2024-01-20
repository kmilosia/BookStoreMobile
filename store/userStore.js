import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import axiosClient from "../utils/axiosClient";

export const useAuthStore = create((set) => ({
    restoring: true,
    token: null,
    loading: false,
    error: null,
    signIn: async (data) => {
        set({error: null, loading: true})
        try{
            const response = await axiosClient.post('/Account/login', data);
            if(response.status === 200){
                const userToken = response.data
                set({token: userToken})
                await AsyncStorage.setItem('token', userToken)
                console.log(userToken);
            }else{
                set({error: 'Nieudane logowanie'})
            }
        }catch(e){
            console.log(e);
            set({error: 'Error podczas logowania'})
        }
        set({loading: false})
    },
    signOut: async () => {
        try{
            await AsyncStorage.removeItem('token')
            set({token: null})
        }catch(e){
            console.log(e);
            set({error: 'Nieudana próba wylogowania'})
        }
    },
    deleteAccount: async (setLoading,setSuccess) => {
        try{
            const userToken = await AsyncStorage.getItem('token')
            if(userToken){
                const response = await axiosClient.delete(`/User`, {
                    headers: {
                        'Authorization': `Bearer ${userToken}`,
                    },
                  })
                if(response.status = 200 || response.status === 204){
                    setSuccess(true)
                    set({token: null})
                }else{
                    setSuccess(false)
                }
            }else{
                setSuccess(false)
            }
            setLoading(false)
        }catch(e){
            console.log(e);
            setLoading(false)
            setSuccess(false)
        }
    },
    restoreToken: async () => {
        set({restoring: true, error: null})
        try{
            const userToken = await AsyncStorage.getItem('token')
            if(userToken){
                const response = await axiosClient.post(`/Account/CheckTokenValidity?token=${userToken}`)
                if(response.status === 200){
                    set({ token: userToken })
                }else{
                    set({token: null})
                }
            }else{
                set({ token: null })
            }
        }catch(e){
            console.log(e);
        }
        set({restoring: false})
    }
}))
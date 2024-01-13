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
            console.log("logowanie")
            if(response.status === 200){
                const userToken = response.data
                set({token: userToken})
                await AsyncStorage.setItem('token', userToken)
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
    restoreToken: async () => {
        set({restoring: true, error: null})
        try{
            const userToken = await AsyncStorage.getItem('token')
            if(userToken){
                set({ token: userToken })
            }
        }catch(e){
            console.log(e);
            set({error: 'Błąd podczas pobierania klucza'})
        }
        set({restoring: false})
    }
}))
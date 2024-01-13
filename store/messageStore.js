import { create } from "zustand";

export const useMessageStore = create((set) => ({
    message: {
        value: '',
        type: '',
        bool: false,
    },
    setMessage: ({value, type, bool}) => set((state) => ({message: {...state.message, value: value, type: type, bool: bool}})),
}))
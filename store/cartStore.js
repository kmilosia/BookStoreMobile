import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

export const useCartStore = create((set) => ({
    cart: [],
    totalAmount: 0,
    isElectronicPurchase: false,

  addToCart: async (newItem) => {
    try {
      let cart = await AsyncStorage.getItem('cart');
      cart = cart ? JSON.parse(cart) : [];
      const cartItem = cart.find((item) => item.id === newItem.id);
      if (cartItem) {
        cartItem.quantity++;
      } else {
        cart.push({ ...newItem, quantity: 1 });
      }
      await AsyncStorage.setItem('cart', JSON.stringify(cart));
      set({cart})
      set((state) => ({ totalAmount: calculateTotalAmount(state.cart) }));
    } catch (e) {
      console.log(e);
    }
  },

  incrementCartItem: async (newItem) => {
    try {
      let cart = await AsyncStorage.getItem('cart');
      cart = cart ? JSON.parse(cart) : [];
      const cartItem = cart.find((item) => item.id === newItem.id);
      cartItem.quantity++;
      await AsyncStorage.setItem('cart', JSON.stringify(cart));
      set({ cart });
      set((state) => ({ totalAmount: calculateTotalAmount(state.cart) }));
    } catch (e) {
      console.log(e);
    }
  },

  decrementCartItem: async (newItem) => {
    try {
      let cart = await AsyncStorage.getItem('cart');
      cart = cart ? JSON.parse(cart) : [];
      const cartItem = cart.find((item) => item.id === newItem.id);
      if (cartItem.quantity === 1) {
        cartItem.quantity = 1;
      } else {
        cartItem.quantity--;
      }
      await AsyncStorage.setItem('cart', JSON.stringify(cart));
      set({ cart });
      set((state) => ({ totalAmount: calculateTotalAmount(state.cart) }));
    } catch (e) {
      console.log(e);
    }
  },

  removeCartItem: async (newItem) => {
    try {
      let cart = await AsyncStorage.getItem('cart');
      cart = cart ? JSON.parse(cart) : [];
      cart = cart.filter((item) => item.id !== newItem.id);
      await AsyncStorage.setItem('cart', JSON.stringify(cart));
      set({ cart })
      set((state) => ({ totalAmount: calculateTotalAmount(state.cart) }));
    } catch (e) {
      console.log(e);
    }
  },

  emptyCart: async () => {
    try {
      await AsyncStorage.removeItem('cart');
      set({ cart: [], totalAmount: 0, isElectronicPurchase: false });
    } catch (e) {
      console.log(e);
    }
  },

  returnCart: async (setData, setLoading) => {
    try {
        const cart = await AsyncStorage.getItem('cart');
        setData(JSON.parse(cart));
        setLoading(false);
        const amount = calculateTotalAmount(JSON.parse(cart));
        const isElectronic = checkElectronicCart(JSON.parse(cart))
        set({ totalAmount : amount });
        set({ isElectronicPurchase : isElectronic });
    } catch (e) {
        console.log(e);
        setLoading(false);
    }
},
  
  logCart: async () => {
    try {
      const cart = await AsyncStorage.getItem('cart');
      console.log(cart);
    } catch (e) {
      console.log(e);
    }
  },
}));

const calculateTotalAmount = (cart) => {
  return cart.reduce((total, item) => {
    const priceToUse = item.discountedBruttoPrice !== 0 ? item.discountedBruttoPrice : item.price;
    return total + item.quantity * priceToUse;
  }, 0);
};

const checkElectronicCart = (cart) => {
  const bool = cart.some((item) => item.formID === 1)
  return (!bool)
};

export default useCartStore;

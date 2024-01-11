import AsyncStorage from "@react-native-async-storage/async-storage";

export const addToCart = async (newItem) => {
    try{
        let cart = await AsyncStorage.getItem('cart')
        cart = cart ? JSON.parse(cart) : []
        const cartItem = cart.find((item) => item.id === newItem.id)
        if(cartItem){
            cartItem.quantity++
        }else{
            cart.push({...newItem, quantity: 1})
        }
        AsyncStorage.setItem('cart', JSON.stringify(cart))
    }catch(e){
        console.log(e);
    }
}

export const incrementCartItem = async (newItem) => {
    try {
      let cart = await AsyncStorage.getItem('cart')
      cart = cart ? JSON.parse(cart) : []
      const cartItem = cart.find((item) => item.id === newItem.id)
      cartItem.quantity++  
      await AsyncStorage.setItem('cart', JSON.stringify(cart))
    } catch (e) {
      console.log(e)
    }
  }
  
  export const decrementCartItem = async (newItem) => {
    try {
      let cart = await AsyncStorage.getItem('cart')
      cart = cart ? JSON.parse(cart) : []
      const cartItem = cart.find((item) => item.id === newItem.id)
      if(cartItem.quantity === 1) {
        cartItem.quantity = 1
      }else {
        cartItem.quantity--
      }
      await AsyncStorage.setItem('cart', JSON.stringify(cart))
    } catch (e) {
      console.log(e)
    }
  }
export const removeCartItem = async (newItem) => {
    try{
        let cart = await AsyncStorage.getItem('cart')
        cart = cart ? JSON.parse(cart) : []
        cart = cart.filter((item) => item.id !== newItem.id)
        AsyncStorage.setItem('cart', JSON.stringify(cart))
    }catch(e){
        console.log(e);
    }
}
export const emptyCart = async () => {
    try{
        AsyncStorage.removeItem('cart')
    }catch(e){
        console.log(e);
    }
}

export const returnCart = async (setData, setLoading) => {
    try{
        const cart = await AsyncStorage.getItem('cart')
        console.log(cart);
        setData(JSON.parse(cart))
        setLoading(false)
    }catch(e){
        console.log(e);
        setLoading(false)
    }
}
export const logCart = async () => {
    try{
        const cart = await AsyncStorage.getItem('cart')
        console.log(cart);
    }catch(e){
        console.log(e);
    }
}

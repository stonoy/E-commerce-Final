import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 500,
  tax: 0,
  orderTotal: 0,
};

const getCartFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('cart')) || defaultState
}

const cartSlice = createSlice({
  name: "cart",
  initialState: getCartFromLocalStorage(),
  reducers: {
    addItem: (state, {payload: {product:givenProduct}}) => {
      givenProduct.amount = Number(givenProduct.amount)
      const item = state.cartItems.find(product => product._id === givenProduct._id)
      if(item){
        item.amount = givenProduct.amount
      }else{
        state.cartItems.push(givenProduct)
      }

      state.numItemsInCart += givenProduct.amount
      state.cartTotal += (givenProduct.price*givenProduct.amount)
      cartSlice.caseReducers.calculateTotal(state)
     
    },
    clearCart: (state) => {
      localStorage.clear()
      return defaultState
    },
    removeItem: (state, {payload:{localCartId}}) => {
      
      state.cartItems = state.cartItems.filter(item => item.localCartId !== localCartId)

      state.numItemsInCart = state.cartItems.reduce((total, item) => {
        total += item.amount
        return total
      },0)
      state.cartTotal = state.cartItems.reduce((total, item) => {
        total += item.price*item.amount
        return total
      },0)
      cartSlice.caseReducers.calculateTotal(state)
    },
    editItem: (state, {payload:{localCartId,newAmount,job}}) => {
      let product = state.cartItems.find(item => item.localCartId === localCartId)
      if(job === 'minus' && product.amount === 1){
        state.cartItems = state.cartItems.filter(item => item.localCartId !== localCartId)
        
      }else{
        
        product.amount = newAmount
        
      }
      

      state.numItemsInCart = job === 'minus' ? state.numItemsInCart - 1 : state.numItemsInCart + 1
      state.cartTotal = state.cartItems.reduce((total, item) => {
        total += item.price*item.amount
        return total
      },0)
      cartSlice.caseReducers.calculateTotal(state)
    },
    calculateTotal: (state) => {
      state.tax = 0.2*(state.cartTotal)
      state.orderTotal = state.cartTotal + state.shipping + state.tax
      localStorage.setItem('cart', JSON.stringify(state))
    }
  },
});

export const { addItem, clearCart, removeItem, editItem } = cartSlice.actions;

export default cartSlice.reducer;

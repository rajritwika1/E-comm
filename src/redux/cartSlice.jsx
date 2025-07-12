import { createSlice } from '@reduxjs/toolkit';

// ✅ Safe localStorage parsing
/*let storedCart = [];
const cartData = localStorage.getItem('cart');

if (cartData && cartData !== "undefined" && cartData !== "null") {
    try {
        storedCart = JSON.parse(cartData);
        if (!Array.isArray(storedCart)) storedCart = [];
    } catch (e) {
        console.error("Failed to parse cart from localStorage:", e);
        localStorage.removeItem('cart');
        storedCart = [];
    }
}
*/
const initialState = JSON.parse(localStorage.getItem('cart')) ?? [];
console.log(initialState);
 export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            state.push(action.payload);
        },
        deleteFromCart(state, action) {
            return state.filter(item => item.id !== action.payload.id);
        },
        incrementQuantity(state, action) {
            const item = state.find(item => item.id === action.payload);
            if (item) item.quantity++;
        },
        decrementQuantity(state, action) {
            const item = state.find(item => item.id === action.payload);
            if (item && item.quantity > 1) item.quantity--;
        },
    },
});

// ✅ Export actions
export const { addToCart, deleteFromCart, incrementQuantity, decrementQuantity } = cartSlice.actions;

// ✅ Export reducer as default (this is what you import in store.jsx)
export default cartSlice.reducer;

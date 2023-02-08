import {
    createSlice
} from "@reduxjs/toolkit";
// import { curryGetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";

const initialState = {
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    cartTotalItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")).length : 0,
    cartTotalAmount: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")).map(product => {
        return product.price
    }).reduce((total, curr) => total + curr, 0) : 0,
}

const cartSlice = createSlice({
    name: "cartSlice",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const index = state.cartItems.findIndex(item => item.id === action.payload.id);
            console.log(state.cartItems.length)
            if (index < 0) {
                const productToAdd = {
                    ...action.payload,
                    quantityInCart: 1
                };
                state.cartItems = state.cartItems.concat(productToAdd);
                state.cartTotalItems = state.cartItems.length;
                state.cartTotalAmount += action.payload.price;
            } else {
                state.cartItems[index].quantityInCart += 1;
                state.cartTotalAmount += action.payload.price;
            }

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(product => product.id !== action.payload.id);
            state.cartTotalItems -= 1;
            state.cartTotalAmount -= action.payload.price;
            console.log("removed item: " + JSON.stringify(action.payload));
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        addQuantity: (state, action) => {
            state.cartItems = state.cartItems.map(product => {
                if (product.id === action.payload.id) {
                    product.quantityInCart += 1;
                }
                return product;
            })
            state.cartTotalAmount += action.payload.price;
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        deductQuantity: (state, action) => {
            state.cartItems = state.cartItems.map(product => {
                if (product.id === action.payload.id) {
                    product.quantityInCart -= 1;
                }
                return product;
            })
            state.cartTotalAmount -= action.payload.price;
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        clearCart: (state, action)=>{
            state.cartItems = [];
            state.cartTotalAmount = 0;
            state.cartTotalItems = 0;
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        }

    }
})

export const {
    addToCart,
    removeFromCart,
    addQuantity,
    deductQuantity,
    clearCart
} = cartSlice.actions; //export action creators

export default cartSlice.reducer;
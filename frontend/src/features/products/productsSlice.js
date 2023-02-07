import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";


const initialState = {
    items: [],
    status: null,
    error: null,
}


//createAsyncThunk has first parameter as the action type(string) and the second parameter is the payload creator
// export const productsFetch = createAsyncThunk("products/productsFetch",async(id=null, {rejectWithValue})=>{
//    try {
//     const response = await axios.get("http://localhost:3000/products");
//     return response?.data;  
//    } catch (error) {
//         return rejectWithValue("The request was rejected"); //rejectWithValue assigns the action.payload the value of parameter of rejectWithValue;
//    }
// })

const productsSlice = createSlice({
    name:"products",
    initialState,
    reducers:{
    },
    // extraReducers:{
    //     [productsFetch.pending]: (state, action)=>{
    //         state.status = "Pending";
    //     },
    //     [productsFetch.fulfilled]: (state, action)=>{
    //         state.status = "Fullfilled";
    //         state.items = action.payload;
    //     },
    //     [productsFetch.rejected]: (state, action)=>{
    //         state.status = "Rejected";
    //         state.error = action.payload;
    //     }
    // }


})


export default productsSlice.reducer; // This will be imported in the as productsReducer
import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "../slices/userSlice";
import categorySlice from "../slices/categorySlice";


const rootReducer = combineReducers({
    user: userSlice,
    category: categorySlice
})

export default rootReducer;
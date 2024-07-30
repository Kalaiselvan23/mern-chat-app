import authSlice from "@/slices/authSlice"
import chatSlice from "@/slices/chatSlice";
import {configureStore} from "@reduxjs/toolkit";
export const store=configureStore({
    reducer:{
        userInfo:authSlice,
        selectedChat:chatSlice,
    },
})
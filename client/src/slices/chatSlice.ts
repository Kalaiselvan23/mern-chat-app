import { createSlice } from "@reduxjs/toolkit"

const initialState={
    selectedChatType:undefined,
    selectedChatData:undefined,
    selectedChatMessages:[]
}
export const chatSlice=createSlice({
    name:"chat",
    initialState,
    reducers:{
        setSelectedChatType:(state,action)=>{
            state.selectedChatType=action.payload
        },
        setSelectedChatData:(state,action)=>{
            state.selectedChatData=action.payload
        },
        setSelectedMessages:(state,action)=>{
            state.selectedChatMessages=action.payload;
        },
        closeChat:(state)=>{
            state.selectedChatType=undefined
            state.selectedChatData=undefined
        }
    }

})

export const {setSelectedChatType,setSelectedChatData,setSelectedMessages,closeChat}=chatSlice.actions;
export default chatSlice.reducer
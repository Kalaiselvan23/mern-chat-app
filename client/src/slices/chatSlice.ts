import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChatMessage {
  sender: string | { _id: string };
  recipient: string | { _id: string };
  content: string;
  messageType: string;
  fileUrl?: string;
}

interface ChatState {
  selectedChatType: "contact" | "channel" | undefined;
  selectedChatData: any;
  selectedChatMessages: ChatMessage[];
  directMessageContacts:any[],
}

const initialState: ChatState = {
  selectedChatType: undefined,
  selectedChatData: undefined,
  selectedChatMessages: [],
  directMessageContacts:[],
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setSelectedChatType: (state, action: PayloadAction<"contact" | "channel" | undefined>) => {
      state.selectedChatType = action.payload;
    },
    setSelectedChatData: (state, action: PayloadAction<any>) => {
      state.selectedChatData = action.payload;
    },
    setSelectedMessages: (state, action: PayloadAction<ChatMessage[]>) => {
      state.selectedChatMessages = action.payload;
    },
    closeChat: (state) => {
      state.selectedChatType = undefined;
      state.selectedChatData = undefined;
    },
    addMessage: (state, action: PayloadAction<ChatMessage>) => {
      const message = action.payload;
      console.log(`message from addMessage redux`)
      const { selectedChatMessages, selectedChatType } = state;

      state.selectedChatMessages = [
        ...selectedChatMessages,
        {
          ...message,
          recipient:
            selectedChatType === "channel"
              ? message.recipient
              : message.recipient?._id,
          sender:
            selectedChatType === "channel"
              ? message.sender
              : message.sender?._id,
        },
      ];
    },
    setDirectMessageContacts:(state,action)=>{
      state.directMessageContacts=action.payload
    }
  },
});

export const {
  setSelectedChatType,
  setSelectedChatData,
  setSelectedMessages,
  setDirectMessageContacts,
  closeChat,
  addMessage,
} = chatSlice.actions;

export default chatSlice.reducer;

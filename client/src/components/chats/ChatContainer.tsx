// import React from 'react'
// import ChatHeader from './ChatHeader'
// import { SendIcon } from '@/icons'
// import { Button } from '../ui/button'
// import { Input } from '../ui/input'
// import { useState } from 'react'
// import {  useSelector } from 'react-redux'
// import { useSocket } from '@/contexts/SocketContext'
// import MessageContainer from './MessageContainer'


// const ChatContainer = () => {
//     const [inputValue, setInputValue] = useState("");
//     const socket = useSocket();
//     const { selectedChatData, selectedChatType } = useSelector((state: any) => state.selectedChat)
//     const userInfo = useSelector((state: any) => state.userInfo.userInfo)
//     const handleSend = (event: any) => {
//         event.preventDefault()
//         console.log(selectedChatType)
//         if (selectedChatType === 'contact') {
//             console.log("sending Message....")
//             socket?.emit("sendMessage", {
//                 sender: userInfo.id,
//                 content: inputValue,
//                 recipient: selectedChatData._id,
//                 messageType: "text",
//                 fileUrl: undefined,
//             })
//             console.log('message sent')
//         }        setInputValue("")
//     }
//     const handleInput = (event: any) => {
//         setInputValue(event.target.value);
//     }
//     return (
//         <div className="flex-1 flex flex-col">
//             <ChatHeader />
//             <MessageContainer/>
//             <div className="border-t p-4 flex items-center">
//                 <Input type="text" placeholder="Type your message..." onChange={handleInput} value={inputValue} className="flex-1 mr-2" />
//                 <Button onClick={handleSend}>
//                     <SendIcon className="h-5 w-5" />
//                     <span className="sr-only">Send</span>
//                 </Button>
//             </div>
//         </div>
//     )
// }

// export default ChatContainer


import React, { useState } from 'react';
import ChatHeader from './ChatHeader';
import { SendIcon } from '@/icons';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useDispatch, useSelector } from 'react-redux';
import { useSocket } from '@/contexts/SocketContext';
import { addMessage } from '@/slices/chatSlice';
import MessageContainer from './MessageContainer';

const ChatContainer = () => {
  const [inputValue, setInputValue] = useState('');
  const socket = useSocket();
  const { selectedChatData, selectedChatType } = useSelector((state: any) => state.selectedChat);
  const userInfo = useSelector((state: any) => state.userInfo.userInfo);
  const dispatch = useDispatch();

  const handleSend = (event: any) => {
    event.preventDefault();
    if (selectedChatType === 'contact' && inputValue.trim()) {
      console.log('Sending Message...');
      const messageData = {
        sender: { _id: userInfo.id },
        recipient: selectedChatData._id,
        content: inputValue,
        messageType: 'text',
        timestamp: new Date().toISOString(),
      };

      socket?.emit('sendMessage', messageData);
      console.log('Message Sent');
      
      // Dispatch addMessage to update local state
      dispatch(addMessage(messageData));

      setInputValue('');
    }
  };

  const handleInput = (event: any) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="flex-1 flex flex-col">
      <ChatHeader />
      <MessageContainer />
      <div className="border-t p-4 flex items-center">
        <Input
          type="text"
          placeholder="Type your message..."
          onChange={handleInput}
          value={inputValue}
          className="flex-1 mr-2"
        />
        <Button onClick={handleSend}>
          <SendIcon className="h-5 w-5" />
          <span className="sr-only">Send</span>
        </Button>
      </div>
    </div>
  );
};

export default ChatContainer;

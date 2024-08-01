import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import apiClient from '@/lib/apiClient';
import { GET_MESSAGES_ROUTE } from '@/lib/constants';
import { setSelectedMessages } from '@/slices/chatSlice';
const MessageContainer = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const { selectedChatData, selectedChatType, selectedChatMessages } = useSelector((state: any) => state.selectedChat);
    const { userInfo } = useSelector((state: any) => state.userInfo);
    const dispatch = useDispatch()
    useEffect(() => {
        const getMessages = async () => {
            try {
                console.log(userInfo)
                const response = await apiClient.post(GET_MESSAGES_ROUTE, {
                    id: selectedChatData._id,
                    userId:userInfo.id,
                }, { withCredentials: true })
                const data = await response.data;
                if (data.messages) {
                    dispatch(setSelectedMessages(data.messages))
                }
            }
            catch (err) {
                console.log(err)
            }
        }
        if (selectedChatData._id) {
            if (selectedChatType === "contact") getMessages()
        }
    }, [selectedChatData._id, selectedChatType,userInfo._id])

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [selectedChatMessages]);

    const renderMessage = () => {
        let lastDate: string | null = null;
        return selectedChatMessages.map((message: any, index: number) => {
            console.log(message)
            const messageDate = moment(message.timestamp).format('YYYY-MM-DD');
            const showDate = messageDate !== lastDate;
            lastDate = messageDate;
            return (
                <div key={index}>
                    {showDate && (
                        <div className="text-sm text-gray-600 text-center">
                            {moment(message.timestamp).format('MMM D, YYYY')}
                        </div>
                    )}
                    {selectedChatType === 'contact' && renderDMMessages(message)}
                </div>
            );
        });
    };

    // Function to render direct messages
    const renderDMMessages = (message: any) => {
        const isSender = message.sender === userInfo.id;
        const bgColor = isSender ? 'bg-primary' : 'bg-muted';
        const textColor = isSender ? 'text-primary-foreground' : 'text-muted-foreground';
        console.log("render Message:", message)
        return (
            <div>
                <div className={`flex ${isSender ? 'justify-end' : 'justify-start'}`}>
                    <div className={`${bgColor} ${textColor} rounded-lg px-4 py-2 max-w-[65%]`}>
                        {message.content}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {renderMessage()}
            <div ref={scrollRef}></div>
        </div>
    );
};

export default MessageContainer;

// import React, { createContext, useRef, useEffect, useContext, ReactNode } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { io, Socket } from "socket.io-client";
// import { HOST, SOCKET_HOST } from "@/lib/constants";
// import { addMessage } from "@/slices/chatSlice";

// // Define the context and hook for accessing the socket
// const SocketClient = createContext<Socket | null>(null);

// export const useSocket = () => {
//     return useContext(SocketClient);
// };

// // Define the type for the children prop
// interface SocketProviderProps {
//     children: ReactNode;
// }

// export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
//     const socketRef = useRef<Socket | null>(null);
//     const dispatch = useDispatch();
//     const userInfo = useSelector((state: any) => state.userInfo.userInfo);
//     const selectedChat = useSelector((state: any) => state.selectedChat)
//     const { selectedChatType, selectedChatData } = useSelector((state: any) => state.selectedChat)

//     useEffect(() => {
//         console.log("userInfo from socket context:", userInfo)
//         if (userInfo) {
//             console.log("connecting to socket server")
//             socketRef.current = io(SOCKET_HOST, {
//                 withCredentials: true,
//                 query: {
//                     userId: userInfo.id,
//                 },
//             });


//             socketRef.current.on("connect", () => {
//                 console.log("User connected with server");
//             });
//             const handleRecieveMessage = (message: any) => {
//                 console.log(selectedChatData)
//                 console.log(selectedChat)
//                 console.log("Recieved Message:", message);
//                 console.log(message.sender._id);
//                 console.log(message.recipient)
//                 if (selectedChatType !== undefined && (selectedChatData._id === message.sender._id || selectedChatData._id === message.recipient)) {
//                     console.log(message)
//                     dispatch(addMessage(message))
//                 }
//             }
//             socketRef.current.on("recieveMessage", handleRecieveMessage)

//             return () => {
//                 if (socketRef.current) {
//                     socketRef.current.disconnect();
//                 }
//             };
//         }
//     }, [userInfo]);

//     return (
//         <SocketClient.Provider value={socketRef.current}>
//             {children}
//         </SocketClient.Provider>
//     );
// };


import React, {
    createContext,
    useRef,
    useEffect,
    useContext,
    ReactNode,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";
import { addMessage } from "@/slices/chatSlice";
import { SOCKET_HOST } from "@/lib/constants";

const SocketClient = createContext<Socket | null>(null);

export const useSocket = () => {
    return useContext(SocketClient);
};

interface SocketProviderProps {
    children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({
    children,
}) => {
    const socketRef = useRef<Socket | null>(null);
    const dispatch = useDispatch();
    const userInfo = useSelector((state: any) => state.userInfo.userInfo);
    const { selectedChatType, selectedChatData } = useSelector(
        (state: any) => state.selectedChat
    );

    const selectedChatTypeRef = useRef(selectedChatType);
    const selectedChatDataRef = useRef(selectedChatData);

    useEffect(() => {
        selectedChatTypeRef.current = selectedChatType;
        selectedChatDataRef.current = selectedChatData;
    }, [selectedChatType, selectedChatData]);

    const handleRecieveMessage = (message: any) => {
        const latestSelectedChatType = selectedChatTypeRef.current;
        const latestSelectedChatData = selectedChatDataRef.current;

        if (
            latestSelectedChatType !== undefined &&
            latestSelectedChatData &&
            (latestSelectedChatData._id === message.sender._id ||
                latestSelectedChatData._id === message.recipient)
        ) {
            console.log("Dispatching message");
            dispatch(addMessage(message));
        }
    };

    useEffect(() => {
        console.log("UserInfo from socket context:", userInfo);

        if (userInfo) {
            console.log("Connecting to socket server");
            socketRef.current = io(SOCKET_HOST, {
                withCredentials: true,
                query: {
                    userId: userInfo.id,
                },
            });

            socketRef.current.on("connect", () => {
                console.log("User connected with server");
            });
            socketRef.current.on("recieveMessage", handleRecieveMessage);

            return () => {
                if (socketRef.current) {
                    socketRef.current.disconnect();
                }
            };
        }
    }, [userInfo]);

    return (
        <SocketClient.Provider value={socketRef.current}>
            {children}
        </SocketClient.Provider>
    );
};

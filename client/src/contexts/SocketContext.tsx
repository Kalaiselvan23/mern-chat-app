import React, { createContext, useRef, useEffect, useContext, ReactNode } from "react";
import { useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";
import { HOST, SOCKET_HOST } from "@/lib/constants";

// Define the context and hook for accessing the socket
const SocketClient = createContext<Socket | null>(null);

export const useSocket = () => {
    return useContext(SocketClient);
};

// Define the type for the children prop
interface SocketProviderProps {
    children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
    const socketRef = useRef<Socket | null>(null);
    const userInfo = useSelector((state: any) => state.userInfo.userInfo);

    useEffect(() => {
        console.log("userInfo from socket context:",userInfo)
        if (userInfo) {
            console.log("connecting to socket server")
            socketRef.current = io(SOCKET_HOST, {
                withCredentials: true,
                query: {
                    userId: userInfo.id,
                },
            });

            socketRef.current.on("connect", () => {
                console.log("User connected with server");
            });

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

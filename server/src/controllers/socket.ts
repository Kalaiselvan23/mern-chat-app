import { Server as SocketIOServer } from "socket.io";
import Message from "../models/MessageSchema";
export const socketSetup = (server: any) => {
  console.log(`initiating connection....`);
  const io = new SocketIOServer(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  // TO STORE ONLINE USERS
  const userSocketMap = new Map();

  /// HANDLE DISCONNECTION
  const disconnectSocket = (socket: any) => {
    console.log(`Disconnected user of id ${socket.id}`);
    //remove user from map
    userSocketMap.delete(socket.id);
  };

  // SEND MESSAGE FUCNTION
  const sendMessage = async (message: any) => {
    try {
      console.log("sending message ", message);
      const senderSocketId = userSocketMap.get(message.sender);
      const recieverSocketId = userSocketMap.get(message.recipient);
      const createMessage = await Message.create(message);
      const messageData = await Message.findById(createMessage._id)
        .populate("sender", "id email firstName lastName image color")
        .populate("recipient", "id email firstName lastName image color");
      if (recieverSocketId) {
        console.log('sending message to reciever..')
        io.to(recieverSocketId).emit("recieveMessage", messageData);
      }
      if (senderSocketId) {
        console.log('sending message to sender..')
        io.to(senderSocketId).emit("recieveMessage", messageData);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // CONNECTION
  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId) {
      userSocketMap.set(userId, socket.id);
      console.log(`${userId} is connected with socketId ${socket.id}`);
    } else {
      console.log("Userid not providd");
    }
    socket.on("sendMessage", sendMessage);
    socket.on("disconnect", () => disconnectSocket(socket));
  });
};

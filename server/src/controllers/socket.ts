import { Server as SocketIOServer } from "socket.io";
export const socketSetup = (server: any) => {
  const io = new SocketIOServer({
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });
  const userSocketMap = new Map();
  const disconnectSocket = (socket: any) => {
    console.log(`Disconnected user of id ${socket.id}`);
    //remove user from map
    userSocketMap.delete(socket.id);
  };
  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId) {
      userSocketMap.set(userId, socket.id);
      console.log(`${userId} is connected with socketId ${socket.id}`);
    } else {
      console.log("Userid not providd");
    }

    socket.on("disconnect", () => disconnectSocket(socket));
  });
};

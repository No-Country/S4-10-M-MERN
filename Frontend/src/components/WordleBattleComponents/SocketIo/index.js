import io from "socket.io-client";
export const cliente = io("http://localhost:3000", { autoConnect: true });
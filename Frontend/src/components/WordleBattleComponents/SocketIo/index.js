import io from "socket.io-client";
export const client = io("https://s4-10-m-mern-production.up.railway.app", {autoConnect: false});
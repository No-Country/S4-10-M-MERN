import {Server as ServerSocket} from "socket.io"

export function socketIoServer() {

    let player1
    let player2
const io = new ServerSocket(3000, {
    cors: {
        origin: '*',
    }
})

io.on('connection', (socket) => {

    socket.on("prepareGame", (datos, callback) => {
        player1 = datos.transmitter;
        player2 = datos.opponent;
          callback({
            status: "ok"
          });
          socket.to(player2).emit("acceptGame", player1)
    });

    socket.on("gameAccepted", (callback) => {
        callback({
            player: player1,
            opponent: player2
        });
        socket.to(player1).emit("startGame", player2)
        socket.to(player2).emit("startGame", player1)
    });

    socket.on("newPlay", (contrincante, data, callback) => {
        callback({
            status: "transmitted"
        });
        socket.to(player1).emit("newPlay", data)
        socket.to(player2).emit("newPlay", data)
    });

    socket.on("gameEnded", (callback) => {
        callback({
            status: "have a winner"
        });
        socket.to(player1).emit("gameEnded")
        socket.to(player2).emit("gameEnded")
    });
})
};


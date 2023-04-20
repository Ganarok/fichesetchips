import { Socket } from "socket.io"

export default function updatesSockets(socket: Socket) {
    socket.on('update', (n) => {
        if (n.to)
            socket.to(n.to).emit('update', n)
        else
            socket.broadcast.to(n.roomId).emit('update', n)
    });

    socket.on('update_character_position', (n) => {
        socket.broadcast.to(n.roomId).emit('update_character_position', n)
    });

    socket.on("update_character_life", (n) => {
        socket.broadcast.to(n.roomId).emit('message', "Player " + n.firstname + " " + n.lastname + " has " + n.update + " life points left.")
    });

    socket.on("update_character_xp", (n) => {
        socket.broadcast.to(n.roomId).emit('message', "Player " + n.firstname + " " + n.lastname + " has gain " + n.update + " xp points.")
    });

    socket.on("update_map", (n) => {
        socket.broadcast.to(n.roomId).emit('update_map', n)
    });
}
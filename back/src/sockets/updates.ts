import { Socket } from "socket.io"

export default function updatesSockets(socket: Socket) {
    socket.on('update', (n) => {
        if (n.to)
            socket.to(n.to).emit('update', n)
        else
            socket.broadcast.to(n.roomId).emit('update', n)
    })
}
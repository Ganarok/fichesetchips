import { Socket, Namespace } from "socket.io"

export default function messagesSockets(namespace: Namespace, socket: Socket) {
    socket.on('message', (n) => {
        if (n.to) {
            socket.to(n.to).emit('message', n)
        }
        else {
            socket.broadcast.to(n.roomId).emit('message', n.message)
        }
    })
}
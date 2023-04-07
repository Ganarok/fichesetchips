import { Socket } from "socket.io"

export default function messagesSockets(socket: Socket) {
    socket.on('message', (n) => {
        if (n.to) {
            console.log('Message to sent: ' + n.message)
            socket.to(n.to).emit('message', n)
        }
        else {
            console.log('Message received: ' + n.message)
            socket.broadcast.to(n.roomId).emit('message', n)
        }
    })
}
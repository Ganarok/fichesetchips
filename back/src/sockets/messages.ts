import { Socket, Namespace } from "socket.io"

export default function messagesSockets(namespace: Namespace, socket: Socket) {
    socket.on('message', (n) => {
        if (n.to) {
            //console.log('Message to sent: ' + n.message)
            socket.to(n.to).emit('message', n)
        }
        else {
            //console.log('Server : Message received: ' + n.message)
            socket.broadcast.to(n.roomId).emit('message', n.message)
            // socket.emit("message", "You said: " + n.message + "")
        }
    })
}
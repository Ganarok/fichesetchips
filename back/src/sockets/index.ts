import { Namespace } from "socket.io"
import messagesSockets from "./messages"
import updatesSockets from "./updates"

export default function initSockets(namespace: Namespace) {
    namespace.on('connection', (socket) => {
        console.log('User connected')

        socket.on('join', (n) => {
            const roomId = n.roomId

            console.log(`Room ${roomId} joined by user ${socket.id}`)

            // TODO: Récupérer en DB (ou non) le state actuel de la partie

            socket.join(roomId)
            socket.emit('room_joined', {
                connectionId: socket.id,
                // TODO: Rajouter le state de la game en DB
            })
        })
    
        messagesSockets(socket)
        updatesSockets(socket)
    
        socket.on('leaving_room', (n) => {
            console.log('User disconnected')

            if (n.roomId)
                socket.broadcast.to(n.roomId).emit('leaving_room', n)
        })
    })
}
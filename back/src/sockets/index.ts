import { Namespace } from "socket.io"
import messagesSockets from "./messages"
import updatesSockets from "./updates"

export default function initSockets(namespace: Namespace) {
    namespace.on('connection', (socket) => {
        socket.emit("connection", "You are connected to the server")
        socket.on('join', (n) => {
            const roomId = n.roomId
            //console.log(`Room ${roomId} joined by user ${socket.id}`)

            // TODO: Récupérer en DB (ou non) le state actuel de la partie
            
            socket.join(roomId)
            //namespace.allSockets().then((s) => console.log(s))
            socket.emit('room_joined', {
                connectionId: socket.id,
                // TODO: Rajouter le state de la game en DB
            })
        })
        
        messagesSockets(namespace, socket)
        updatesSockets(socket)
        
        socket.on('leaving_room', (n) => {
            socket.emit('leaving_room', "You are disconnected from the room")
            if (n.roomId)
            socket.broadcast.to(n.roomId).emit('leaving_room', n)
        })
    })
}
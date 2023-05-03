import { io } from "socket.io-client"

export const useSocketIO = () => {
    const socket = io(
        process.env.NODE_ENV === "production"
            ? `https://${process.env.VUE_APP_SERVER_HOST}:${process.env.VUE_APP_SERVER_PORT}/rooms`
            : "http://localhost:3000/rooms",
        {}
    )

    return {
        socket,
    }
}

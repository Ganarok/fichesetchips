import { io } from "socket.io-client"

export const useSocketIO = () => {
    const socket = io(
        process.env.BACK_HOST
            ? `${process.env.BACK_HOST}/rooms`
            : "http://localhost:3000/rooms",
        {}
    )

    return {
        socket,
    }
}

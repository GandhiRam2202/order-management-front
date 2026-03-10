import { io } from "socket.io-client"

const socket = io(import.meta.env.SOCKET)

export default socket
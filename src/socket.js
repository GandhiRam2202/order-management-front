import { io } from "socket.io-client"

const socket = io("https://order-management-back-j1pm.onrender.com")

export default socket
const socketioredis = require('socket.io-redis')
const io = require('socket.io')

// Middlewares
const registerSocket = require('./middlewares/registerSocket')

// Library
const roomsLoader = require('./libs/roomsLoader')
const eventsLoader = require('./libs/eventsLoader')

const Socket = {
  listen(server) {
    const socketInstance = io(server)
    socketInstance.adapter(socketioredis({
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT)
    }))
    // Global Middleware
    socketInstance.use(registerSocket)
    socketInstance.on("connection", socket => {
      const { roomsToJoin, tenantId, userId } = socket.personalData

      // Join Specific Room
      roomsLoader(socket, roomsToJoin, userId)

      // Define All-Events
      eventsLoader(tenantId, 'tenant')(socket)
      eventsLoader(tenantId, 'role')(socket)
      eventsLoader(tenantId, 'personal')(socket)

      console.log("Connected", socket.personalData.userId)
    })
    return socketInstance
  }
}

module.exports = Socket
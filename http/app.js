const express = require('express')
const helmet = require('helmet')
const socket = require('../socket/socket')
const path = require('path');
const loader = async function (serverProtocol, port, host, hostname, cert = undefined) {
  try {
    const app = express()

    // ROUTES MODULES
    const cacheManagerRoute = require('./routes/cache')

    // GLOBAL MIDDLEWARES
    // Securing response header
    app.use(helmet())
    // CORS-ENABLED
    app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
      next()
    })

    // ROUTES REGISTER
    app.get('/test', (req, res, next) => {
      res.send("OK")
    })

    app.use('/cache-manager', cacheManagerRoute)

    app.get('/emitTenant', (req, res, next) => {
      req.app.io.to('demo').emit('hello', "to all clients in 'room42' room");
      res.send('ok')
    })

    app.get('/html', function (req, res) {
      res.sendFile(path.join(__dirname, '..', 'socket-test.html'));
    });

    // HTTPS
    if (cert) {
      return console.log('https')
    }
    // HTTP
    const server = serverProtocol.createServer(app)

    // Setup Socket Server.
    const socketServer = socket.listen(server);

    // Register socket instance to app
    app.io = socketServer;

    return server.listen(port, host, () => {
      console.log(`ON5 Socket Server                  : ${hostname}:${port}`)
      console.log(`/                                  : ${hostname}:${port}/test`)
      console.log(`/html                              : ${hostname}:${port}/html`)
      console.log(`/cache-manager                     : ${hostname}:${port}/cache-manager/test`)
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = loader
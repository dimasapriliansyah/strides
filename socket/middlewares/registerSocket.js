module.exports = (socket, next) => {
  const { tenantId, role, username } = socket.handshake.query;
  if (!tenantId || !role || !username) {
    return next(new Error(
      JSON.stringify({
        message: 'Register socket error. Missing tenantId/ role/ username',
        requestURL: socket.handshake.url,
        requestQuery: socket.handshake.query
      })
    ))
  }

  const socketRoleId = `${tenantId}-${role}`
  const socketPersonalId = `${tenantId}-${role}-${username}`

  socket.personalData = {
    userId: socketPersonalId,
    tenantId,
    roomsToJoin: [tenantId, socketRoleId, socketPersonalId]
  }

  return next()
}
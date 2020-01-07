module.exports = (socket, roomsToJoin, socketUserId) => {
  roomsToJoin.forEach((room, idx) => {
    socket.leave(room, (err) => {
      if (err) {
        console.log('Socket on leaving error: ', err.message)
      }
      socket.join(room, (err) => {
        if (err) {
          console.log('Socket on joining error: ', err.message)
        }
        console.log(`userid: ${socketUserId} - Joining room [${room}]`)
      })
    })
  });
}
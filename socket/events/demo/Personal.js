module.exports = (socket) => {
  console.log('demo events acquired');
  socket.on('test_personal', (data) => {
    console.log('test_personal', data)
  })
}
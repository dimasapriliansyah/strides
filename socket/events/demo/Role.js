module.exports = (socket) => {
  console.log('role events acquired');
  socket.on('test_role', (data) => {
    console.log(data)
  })
}
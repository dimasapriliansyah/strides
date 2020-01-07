module.exports = (socket) => {
  socket.on('test_tenant', data => {
    console.log("data abc")
  })
  console.log('tenant events acquired');
}
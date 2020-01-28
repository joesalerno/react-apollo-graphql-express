var net = require("net")

var server = net.createServer(function(socket) {
	socket.write("Echo server\r\n@#🚀#@")
  socket.on('data', function(chunk) {
    socket.write(`${chunk}@#🚀#@`)
  });
  socket.on("error", function(err) {
    console.log(err)
  })
  
})

server.listen(1337, "127.0.0.1")
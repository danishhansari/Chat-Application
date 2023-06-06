const express = require('express');
const app = express();

const { createServer } = require("http")
const httpServer = createServer(app);

const bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine','ejs')
app.use("/static", express.static('public'))

const { Server } = require("socket.io");
const io = new Server(httpServer, { /* options */ })

const uuid = require("uuid");

const port = 3000;

app.get('/', (req, res) => {
  res.render('pages/index');
})

app.get('/chat', (req, res) => {
  // io.sockets.emit("create", req.query.roomId);
  res.render('pages/chat')
})
 
app.get('/generate-room-id', (req, res) => {
  // console.log(req.body);
  let roomId = uuid.v4();
  res.status(200).send({"roomId":roomId})
})

// io.sockets.on('connection', function(socket) {
//   socket.on('create', function(roomId) {
//     socket.join(roomId);
//   });
//   socket.on("send", function(roomId, name, msg){
//     io.to(roomId).emit({"name": name, "msg": msg})
//   })
// });
io.on("connection", (socket) => {
  socket.on("join-room", (name, roomId) => {
    console.log(name)
    socket.join(roomId);
    io.to(roomId).emit("user-connected", name)
  })
})
httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
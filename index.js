const express = require('express');
const bodyParser = require('body-parser');

const { createServer } = require("http")
const { Server } = require("socket.io");

const uuid = require("uuid");

const app = express();
const httpServer = createServer();


const io = new Server(httpServer, { /* options */ });
app.set('view engine','ejs')
app.use("/static", express.static('public'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const port = 3000
app.get('/', (req, res) => {
  res.render('pages/index');
})
app.get('/generate-room-id', (req, res) => {
  // console.log(req.body);
  let roomId = uuid.v4();
  res.status(200).send({"roomId":roomId})
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
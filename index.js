const express = require('express');
const bodyParser = require('body-parser')
const app = express();
app.set('view engine','ejs')
app.use("/static", express.static('public'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const port = 3000
app.get('/', (req, res) => {
  res.render('pages/index');
})
app.post('/enter-room', (req, res) => {
  console.log(req.body);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
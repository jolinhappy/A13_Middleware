const express = require('express')
const app = express()
const port = 3000
const moment = require('moment')
const tz = require('moment-timezone')


app.use((req, res, next) => {
  const reqTime = new Date()
  const taipeiTime = moment(reqTime).tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss')
  const reqMs = Date.now()
  res.on('finish', () => {
    const resMs = Date.now()
    const duringTime = resMs - reqMs
    const serverMessage = `${taipeiTime} | ${req.method} from ${req.url} | total time: ${duringTime}ms`
    if (req.url === '/favicon.ico') return
    console.log(serverMessage)
  })
  return next()
})


app.get('/', (req, res) => {
  res.send('列出全部 Todo')
})

app.get('/new', (req, res) => {
  res.send('新增 Todo 頁面')
})

app.get('/:id', (req, res) => {
  res.send('顯示一筆 Todo')
})

app.post('/', (req, res) => {
  res.send('新增一筆  Todo')
})

app.listen(port, () => {
  console.log(`App running on port ${port}`)
})
const express = require('express')

const server = express()

// 编写路由处理不同url的处理
server.get('/', (req, res) => {
  res.send('hello vuesrr')
})
server.listen(80, () => {
  console.log('server running, hah ')
})

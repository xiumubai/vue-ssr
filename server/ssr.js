const express = require('express')
const Vue = require('vue')
const { createRenderer } = require('vue-server-renderer')

const server = express()
const renderer = createRenderer()

// 编写路由处理不同url的处理
server.get('/', (req, res) => {
  const app = new Vue({
    template: '<div>hello ssr</div>',
  })

  renderer
    .renderToString(app)
    .then((html) => {
      console.log(html)
      res.send(html)
    })
    .catch((err) => {
      res.status(500)
      res.send('Internal server error 500')
      console.log(err)
    })
})
server.listen(80, () => {
  console.log('Server running')
})

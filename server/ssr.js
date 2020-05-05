const express = require('express')
const Vue = require('vue')
// 渲染器导入
const { createRenderer } = require('vue-server-renderer')
const Router = require('vue-router')
Vue.use(Router)
const server = express()
// 创建一个渲染器
const renderer = createRenderer()

// 编写路由处理不同url的处理
server.get('*', async function(req, res) {
  // 创建一个router实例
  const router = new Router({
    mode: 'history',
    routes: [
      { path: '/', component: { template: '<div>index page</div>' } },
      { path: '/detail', component: { template: '<div>detail page</div>' } },
    ],
  })
  // 创建一个Vue实例
  const app = new Vue({
    data: { name: 'Vue ssr' },
    template: `<div @click="onClick">
      <router-link to="detail">detail</router-link>
      <router-view></router-view>
    </div>`,
    router,
    methods: {
      onClick() {
        console.log('hello')
      },
    },
  })
  try {
    router.push(req.url)
    const html = await renderer.renderToString(app)
    res.send(html)
  } catch {
    res.status(500).send('Internal server error 500')
  }
})
server.listen(3000, () => {
  console.log('Server running')
})

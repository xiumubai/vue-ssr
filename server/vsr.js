const Vue = require('vue')

const app = new Vue({
  template: '<div>hello ssr</div>',
})

const { createRenderer } = require('vue-server-renderer')

const renderer = createRenderer()

renderer
  .renderToString(app)
  .then((html) => {
    console.log(html)
  })
  .catch((err) => {
    console.log(err)
  })

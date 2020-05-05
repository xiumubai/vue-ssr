// 传统web，网页内容在服务端渲染完成，一次性传输到浏览器。
// 属于服务端渲染，这里使用express演示传统页面渲染
const express = require('express')
const app = express()

// 获取绝对路径函数
const resolve = (dir) => require('path').resolve(__dirname, dir)

// 1.静态目录开放 dist/client
app.use(express.static(resolve('../dist/client'), { index: false }))

// 2.获取bundleRenderer
const { createBundleRenderer } = require('vue-server-renderer')
const bundle = resolve('../dist/server/vue-ssr-server-bundle.json')
const renderer = createBundleRenderer(bundle, {
  runInNewContext: false,
  template: require('fs').readFileSync(
    resolve('../public/index.html'),
    'utf-8'
  ),
  clientManifest: require(resolve(
    '../dist/client/vue-ssr-client-manifest.json'
  )),
})

// 问题1不能交互
// 问题2不能同构开发
// 问题3路由处理问题
app.get('*', async function(req, res) {
  try {
    const html = await renderer.renderToString({
      url: req.url,
      title: 'ssr test',
    })

    // bundlerenderer.renderToString({url:req.url})
    // 将渲染html字符串返回给客户端
    res.send(html)
  } catch (error) {
    // 将错误信息返回给用户
    res.status(500).send('服务器渲染错误，请重试！')
  }
})

app.listen(3000)

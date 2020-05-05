// 服务端入口：
// 1.导航至首屏

import { createApp } from './main'

export default (context) => {
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp(context)

    // 导航到首屏
    router.push(context.url)

    // 导航过程可能是异步的
    router.onReady(() => {
      // 就绪后可能有异步数据请求
      // 1.获取匹配的组件
      const matchedComponents = router.getMatchedComponents()

      // 可能没有匹配的组件
      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }

      // 遍历这些组件，看看有没有asyncData选项
      // Component组件配置对象
      Promise.all(
        matchedComponents.map((Component) => {
          if (Component.asyncData) {
            return Component.asyncData({
              store,
              route: router.currentRoute,
            })
          }
        })
      ).then(() => {
        // 获取所有数据结果之后，将这些数据存入store
        // 将这些状态指定给上下文，将来bundleRenderer在渲染的时候
        // 会将这些值附加到window.__INITIAL_STATE__
        context.state = store.state

        resolve(app)
      })
    }, reject)
  })
}

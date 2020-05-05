import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'
import { createStore } from './store'

Vue.config.productionTip = false

// 加上混入:只在客户端执行，让他们判断当前组件是否存在asyncData
Vue.mixin({
  beforeMount() {
    // 获取asyncData
    if (this.$options.asyncData) {
      this.$options.asyncData({
        store: this.$store,
        route: this.$route,
      })
    }
  },
})

export function createApp(context) {
  // 1.创建路由器实例
  const router = createRouter()

  // 2.创建store实例
  const store = createStore()

  // 2.创建Vue实例
  const app = new Vue({
    router,
    store,
    context,
    render: (h) => h(App),
  })

  return { app, router, store }
}

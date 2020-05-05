import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      { path: '/', component: { template: '<div>index</div>' } },
      { path: '/detail', component: { template: '<div>detail page</div>' } },
    ],
  })
}

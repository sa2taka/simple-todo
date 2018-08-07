import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main-app',
      component: require('@/components/MainApp').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

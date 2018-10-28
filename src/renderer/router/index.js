import Vue from 'vue'
import Router from 'vue-router'
import Root from '@/components/Root'
import MainApp from '@/components/MainApp'
import firebase from 'firebase'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: Root,
      meta: { isNotLogin: true }
    },
    {
      path: '/todo',
      name: 'MainApp',
      component: MainApp,
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requireAuth)
  const isNotLogin = to.matched.some(record => record.meta.isNotLogin)
  if (requiresAuth || isNotLogin) {
    // このルートはログインされているかどうか認証が必要です。
    // もしされていないならば、ログインページにリダイレクトします。
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        if (isNotLogin) {
          next({
            path: '/todo',
            query: { redirect: to.fullPath }
          })
        } else {
          next()
        }
      } else {
        if (requiresAuth) {
          next({
            path: '/',
            query: { redirect: to.fullPath }
          })
        } else {
          next()
        }
      }
    })
  } else {
    next() // next() を常に呼び出すようにしてください!
  }
})

export default router

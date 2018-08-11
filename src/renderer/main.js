import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'

import App from './App'
import router from './router'

import db from './datastore'

// 予め$todosを作っておく
db.find({}).sort({time: 1}).exec((_, docs) => {
  Vue.prototype.$todos = docs
  initVue()
})

function initVue () {
  // イベント用のvueオブジェクトを作る
  Vue.prototype.$eventCaller = new Vue()

  Vue.use(Vuetify)
  if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
  Vue.config.productionTip = false
  Vue.prototype.$db = db

  /* eslint-disable no-new */
  new Vue({
    components: { App },
    router,
    template: '<App/>'
  }).$mount('#app')
}

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'

initVue()

function initVue () {
  Vue.config.productionTip = false

  // Initialize Firebase
  const config = {
    apiKey: 'AIzaSyDVi1pPe-y6EZT7mXY0Bah67EaX4qoWJGo',
    authDomain: 'simple-todo-8abf6.firebaseapp.com',
    databaseURL: 'https://simple-todo-8abf6.firebaseio.com',
    projectId: 'simple-todo-8abf6',
    storageBucket: 'simple-todo-8abf6.appspot.com',
    messagingSenderId: '412469511379'
  }
  firebase.initializeApp(config)

  Vue.use(Vuetify)
  if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
  Vue.config.productionTip = false

  /* eslint-disable no-new */
  new Vue({
    components: { App },
    router,
    template: '<App/>'
  }).$mount('#app')
}

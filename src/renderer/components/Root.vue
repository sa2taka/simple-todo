<template>
  <div class="container">
    <a class="fl_tw login-btn" @click="goToLogin">
      Googleでログイン
    </a>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Root',
  data () {
    return {
    }
  },
  methods: {
    goToLogin () {
      let provider = new firebase.auth.GoogleAuthProvider()
      const self = this
      provider.addScope('profile')
      provider.addScope('email')
      firebase.auth().signInWithRedirect(provider).then(function (result) {
        self.$router.push({ name: 'todo' })
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  display: flex;
  justify-content: center;
}

.login-btn{
  display: inline-block;
  background-color: #26a69b;
  height: 128px;
  color: #FFF;
  line-height: 1;
  text-decoration: none;
  padding: .6em 1.2em;
  border-radius: 3px;
  cursor: pointer;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2);
  -webkit-tap-highlight-color: transparent;
  transition: .3s ease-out;
}

.login-btn:hover{
  box-shadow: 0 3px 3px 0 rgba(0,0,0,0.14), 0 1px 7px 0 rgba(0,0,0,0.12), 0 3px 1px -1px rgba(0,0,0,0.2);
}

.fl_tw {
  text-decoration: none;
  display: inline-block;
  text-align: center;
  font-size: 25px;
  text-decoration: none;
  font-weight: 600;
}

.fl_tw:hover {
  transition: .2s;
}

.fl_tw .twicon .fa {
  line-height: 50px;
}
</style>

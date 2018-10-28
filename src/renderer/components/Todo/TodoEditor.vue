<template>
  <div class="editor">
    <v-layout justify-end text-center column @keyup.ctrl.enter="onEnter">
      <v-flex xs12>
        <v-text-field id="todo-text-area" v-model="text" placeholder="Press Ctrl+Enter to Add a Todo"></v-text-field>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'todo-editor',
  data () {
    return {
      text: ''
    }
  },
  methods: {
    onEnter () {
      const self = this
      if (this.text === '') {
        return
      }

      firebase.auth().onAuthStateChanged(function (user) {
        const currentUserRef = firebase.database().ref('users/' + user.uid + '/todos')

        currentUserRef.push({
          'text': self.text,
          'priority': 3,
          'created_at': Date.now(),
          'updated_at': Date.now()
        })
        self.text = ''
      })
    }
  },
  mounted () {
    document.onclick = () => {
      document.getElementById('todo-text-area').focus()
    }
  }
}
</script>

<style>
.editor {
  position: fixed;
  width: 100%;
  top: 32px;
  background: rgb(32, 33, 33);
  border-radius: 20px;
  padding: 0 3%;
}
</style>

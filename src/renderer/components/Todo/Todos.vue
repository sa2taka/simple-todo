<template>
  <div class="todos">
    <v-layout align-center justify-start column fill-height>
      <todo v-for="(todo, key) in todos" :todo="{key: key, todo: todo}"  :key="key" @delete="onDelete"></todo>
    </v-layout>
  </div>
</template>

<script>
import Todo from '@/components/Todo/_todo.vue'
import firebase from 'firebase'

export default {
  name: 'todos',
  data () {
    return {
      todos: []
    }
  },
  mounted () {
    const self = this
    firebase.auth().onAuthStateChanged(function (user) {
      const todosRef = firebase.database().ref('users/' + user.uid + '/todos')

      todosRef.on('value', function (snapshot) {
        self.todos = snapshot.val()
        self.$forceUpdate()
      })
    })
  },
  methods: {
    onDelete (key) {
      firebase.auth().onAuthStateChanged(function (user) {
        firebase.database().ref('users/' + user.uid + '/todos/' + key).remove()
      })
    }
  },
  components: {
    Todo
  }
}
</script>

<style>
.todos {
  position: relative;
  top: 128px;
  background-color: #303030;
}
</style>

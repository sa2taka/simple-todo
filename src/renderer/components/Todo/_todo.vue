<template>
  <div :class="[todo, { 'todo-primary': isPrimary }, { 'todo-secondary': isSecondary }]" @click="countUpPrimary">
    <div class="del-button" @click.stop="$emit('delete', todo.key)">
      <v-btn dark icon small color="cyan darken-1">
        <v-icon small dark>remove</v-icon>
      </v-btn>
    </div>
    <p class="text">
      {{ todo.todo.text }}
    </p>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'todo',
  data () {
    return {
    }
  },
  computed: {
    isPrimary: function () {
      return this.todo.todo.priority === 1
    },
    isSecondary: function () {
      return this.todo.todo.priority === 2
    }
  },
  methods: {
    countUpPrimary: function () {
      const self = this
      firebase.auth().onAuthStateChanged(function (user) {
        let nextTodoData = self.todo.todo
        const nextPrimary = self.todo.todo['priority'] === 1 ? 3 : self.todo.todo['priority'] - 1
        nextTodoData['priority'] = nextPrimary
        return firebase.database().ref('users/' + user.uid + '/todos/' + self.todo.key).set(nextTodoData)
      })
    }
  },
  props: {
    todo: {}
  }
}
</script>

<style>
.todo {
  position: relative;
  display: flex;
  width: 90%;
  justify-content: end;
  background: rgb(69, 69, 69);
  border-radius: 16px;
  transition: all  0.2s ease;
  padding: 4px 8px;
  margin: 4px;
}
.todo:hover {
  background: rgb(93, 93, 93);
}
.text {
  position: relative;
  font-size: 16px;
  word-break: break-all;
  width: 90%;
  left: 2%;
  top: 8px;
}
.del-button {
  width: 46px;
  display: flex;
  align-items: center;
}
.todo-primary {
  background: rgb(182, 11, 11);
}
.todo-primary:hover {
  background: rgb(200, 29, 29);
}

.todo-secondary {
  background: rgb(4, 125, 28);
}

.todo-secondary:hover {
  background: rgb(18, 139, 42);
}
</style>

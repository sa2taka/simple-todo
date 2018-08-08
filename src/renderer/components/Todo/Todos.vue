<template>
  <div class="todos">
    <v-layout align-center justify-start column fill-height>
      <todo v-for="todo in todos" :todo="todo" @delete="onDelete"></todo>
    </v-layout>
  </div>
</template>

<script>
import Todo from '@/components/Todo/_todo.vue'
export default {
  name: 'todos',
  data () {
    return {
      todos: []
    }
  },
  mounted () {
    let self = this
    this.todos = this.$todos
    this.$eventCaller.$on('changed', (todos) => {
      self.todos = todos
      self.$forceUpdate()
    })
  },
  methods: {
    onDelete (id) {
      let self = this
      let db = this.$db

      db.remove({ _id: id }, {}, (_, numRemoved) => {
        db.find({}).sort({time: 1}).exec((_, docs) => {
          self.$todos = docs
          self.$eventCaller.$emit('changed', docs)
        })
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
  top: 80px;
}

</style>

<template>
  <div class="main-app">
    <todos></todos>
    <todo-editor></todo-editor>
  </div>
</template>

<script>
import Todos from '@/components/Todo/Todos.vue'
import TodoEditor from '@/components/Todo/TodoEditor.vue'
export default {
  name: 'main-app',
  data () {
    return {
    }
  },
  components: {
    Todos,
    TodoEditor
  }
}
</script>

<style>
</style>

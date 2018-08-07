<template>
  <div class="todo">
    <div class="del-button" @click="$emit('delete', todo._id)">
      <v-btn dark icon small color="pink">
        <v-icon small dark>remove</v-icon>
      </v-btn>
    </div>
    <p class="text">
      {{ todo.text }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'todo',
  data () {
    return {
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
</style>

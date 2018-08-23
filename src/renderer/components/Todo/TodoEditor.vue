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
export default {
  name: 'todo-editor',
  data () {
    return {
      text: ''
    }
  },
  methods: {
    onEnter () {
      if (this.text === '') {
        return
      }
      let self = this
      let now = new Date()
      const doc = {
        text: this.text,
        time: now.getTime()
      }

      let db = this.$db

      db.insert(doc, function (err) {
        if (err) {
        }
        db.find({}).sort({time: 1}).exec((_, docs) => {
          self.$todos = docs
          self.$eventCaller.$emit('changed', docs)
        })
      })

      this.text = ''
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
  top: 48px;
  background: rgb(32, 33, 33);
  border-radius: 20px;
  padding: 0 3%;
}
</style>

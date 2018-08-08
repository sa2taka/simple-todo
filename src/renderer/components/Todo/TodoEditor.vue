<template>
  <div class="editor">
    <v-layout justify-end text-center column fill-height class="editor" @keyup.ctrl.enter="onEnter">
      <v-flex xs10 offset-xs1>
        <v-text-field v-model="text" hint="Press Ctrl+Enter to Add a Todo." label="Add a Todo."></v-text-field>
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
  }
}
</script>

<style>
.editor {
  position: absolute;
  width: 100%;
  bottom: 2%;
}
</style>

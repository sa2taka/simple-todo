<template>
  <div id="app">
    <v-app dark>
      <router-view></router-view>
    </v-app>
  </div>
</template>

<script>
  export default {
    name: 'simple-todo',
    data: () => ({
    })
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons');
  /* Global CSS */
  #app::-webkit-scrollbar {
    display: none;
  }
</style>

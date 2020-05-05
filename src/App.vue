<template>
  <div id="app">
    <nav>
      <router-link to="/">index</router-link>
      <router-link to="/detail">detail</router-link>
    </nav>
    <HelloWorld msg="Hello, Vue!"></HelloWorld>
    <router-view></router-view>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  components: {
    HelloWorld,
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

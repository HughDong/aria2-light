<template>
  <Layout />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Layout from './components/Layout.vue';

@Options({
  components: {
    Layout,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
body,html {
  height: 100%;
  overflow: hidden;
  margin: 0px;
}
</style>

<template>
  <v-app>
    <v-app-bar app color="primary">
      <v-toolbar-title>
        <BasicImage
        :src="imageBrand.header.icon.src"
        :alt="imageBrand.header.icon.alt"
        :isIcon="imageBrand.header.icon.isIcon"
        :width="imageBrand.header.icon.width"
        :height="imageBrand.header.icon.height"
        />
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text to="/">Home</v-btn>
      <v-btn text to="/about">About</v-btn>
      <v-btn text to="/login">Login</v-btn>
      <v-btn text to="/register">Register</v-btn>
      <v-btn text to="/mylists">My Lists</v-btn>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import BasicImage from '@/components/basic/image/index.vue'

export default {
  name: "App",
  components: {
    BasicImage,
  },

  data (){
    return {
      imageBrand: require('@/content/basic/branding/text.js')
    }
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>

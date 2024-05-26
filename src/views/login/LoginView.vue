<template>
  <div class="login">
    <h1 class="title">Login in the page</h1>
    <form action class="form" @submit.prevent="login">
      <label class="form-label" for="#email">Username:</label>
      <input
        v-model="username"
        class="form-input"
        type="text"
        id="username"
        required
        placeholder="Username"
      />
      <label class="form-label" for="#password">Password:</label>
      <input
        v-model="password"
        class="form-input"
        type="password"
        id="password"
        placeholder="Password"
      />
      <p v-if="error" class="error">
        Has introducido mal el email o la contraseña.
      </p>
      <input class="form-submit" type="submit" value="Login" />
    </form>
  </div>
</template>

<script>
import auth from "@/services/auth.js";

export default {
  data: () => ({
    username: "",
    password: "",
    error: false,
  }),
  methods: {
    async login() {
      console.log("Login");
      console.log(this.username);
      console.log(this.password);
      try{
        const response = await auth.login(this.username, this.password);
        // Aquí deberíamos guardar el token en el localStorage
        localStorage.setItem("accessToken", response.access);
        localStorage.setItem('userId', response.user_id);
        this.$store.commit("setLoggedIn", true);
        console.log('Response: ',response);
        console.log("Logged in");
        this.$router.push("/mylists");
        
      } catch (error) {
        console.log("Error con la response");
        this.error = true;
        console.log(error);
      }
    },
  },
};
</script>
<style lang="sass" src="@/assets/sass/pages/login/_login.sass" scoped></style>
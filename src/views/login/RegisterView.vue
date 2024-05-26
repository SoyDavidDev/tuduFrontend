<template>
    <div class="register">
      <h1 class="title">Sign Up</h1>
      <form action class="form" @submit.prevent="register">
        <label class="form-label" for="#nane">Username:</label>
        <input
          v-model="username"
          class="form-input"
          type="text"
          id="username"
          required
          placeholder="Username"
        />
        <label class="form-label" for="#nane">First Name:</label>
        <input
          v-model="first_name"
          class="form-input"
          type="text"
          id="first_name"
          required
          placeholder="First Name"
        />
        <label class="form-label" for="#nane">Last Name:</label>
        <input
          v-model="last_name"
          class="form-input"
          type="text"
          id="last_name"
          required
          placeholder="Last Name"
        />
        <label class="form-label" for="#email">Email:</label>
        <input
          v-model="email"
          class="form-input"
          type="email"
          id="email"
          required
          placeholder="Email"
        />
        <label class="form-label" for="#password">Password:</label>
        <input
          v-model="password"
          class="form-input"
          type="password"
          id="password"
          placeholder="Password"
        />
        <label class="form-label" for="#password-repeat"
          >Repite la contraseña:</label
        >
        <input
          v-model="passwordRepeat"
          class="form-input"
          type="password"
          id="password-repeat"
          placeholder="Password"
        />
        <input class="form-submit" type="submit" value="Sign Up" />
      </form>
    </div>
  </template>
  
  <script>
  import auth from "@/services/auth.js"

  export default {
    data: () => ({
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        passwordRepeat: "",
    }),
    methods: {
      register() {
        const response = auth.register(this.username,this.first_name, this.last_name,this.email, this.password);
            console.log("Registered");
      },
    },
  };
  </script>
  
  <style lang="sass" src="@/assets/sass/pages/register/_register.sass" scoped></style>

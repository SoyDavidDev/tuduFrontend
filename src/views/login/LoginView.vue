<template>
  <div class="login">
    <h1 class="title">Log in</h1>
    <form action id="main-form" class="form" @submit.prevent="login">

      <div class="form-email" v-if="resetPassword">
        <label class="form-label" for="#email">Email:</label>
          <v-text-field
            v-model="email"
            class="form-input email-input"
            type="email"
            id="email"
            required
            placeholder="Email"
            :rules="[rules.required, rules.min]"
          />
      </div>

      <div class="form-container" v-if="!resetPassword">
        <label class="form-label" for="#username"
        >Username:</label>
        <v-text-field
          v-model="username"
          type="text"
          id="username"
          required
          placeholder="Username"
          :rules="[rules.required, rules.min]"
          filled
          color="transparent"
          v-show="!resetPassword"
        />
        <label class="form-label" for="#password"
        >Password:</label>
          <v-text-field
            v-model="password"
            :rules="[rules.required, rules.min]"
            :type="show ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            hint="At least 8 characters"
            counter
            filled
            color="transparent"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="show = !show"
            v-show="!resetPassword"
          />
        <p v-show="error" class="error">
          Has introducido mal el email o la contraseña.
        </p>

      </div>

      <div class="form-actions">
        <input class="form-submit" type="submit" :value="resetPassword ? 'Recordar contraseña' : 'Iniciar sesión'" />      
        <v-card-actions>
          <v-btn color="secondary" @click="resetPasswordChange">{{!resetPassword ? 'Recordar Contraseña' : 'Iniciar Sesión'}}</v-btn>
        </v-card-actions>

      </div>
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
    show: false,
    resetPassword: false,
    rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          emailMatch: () => ('The email and password you entered don\'t match')
        }
  }),
  methods: {
    async login() {
      console.log("Login");
      console.log(this.username);
      console.log(this.password);
      try{
        const response = await auth.login(this.username, this.password);
        if (response.access){
          // Aquí deberíamos guardar el token en el localStorage
          localStorage.setItem("accessToken", response.access);
          localStorage.setItem('userId', response.user_id);
          this.$store.commit("setLoggedIn", true);
          console.log('Response: ',response);
          console.log("Logged in");
          this.$router.push("/mylists");
        } else {
          this.error = true;
        }
        
      } catch (error) {
        console.log("Error con la response");
        this.error = true;
        console.log(error);
      }
    },
    resetPasswordChange() {
      this.resetPassword = !this.resetPassword;
      console.log('Solicitar cambio de contraseña');
    },
  },
};
</script>
<style lang="sass" src="@/assets/sass/pages/login/_login.sass" scoped></style>
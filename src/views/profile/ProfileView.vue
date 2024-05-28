<template>
  <div class="profile-view">
    <h1 class="title">Gestión de perfil</h1>
    <form action class="form" @submit.prevent="updateProfile">

        <div class="form-passwordChanging" v-if="passwordChange">
          <label for="password" class="form-label">Contraseña Actual:</label>
          <v-text-field label="Contraseña Actual" type="password" id="password"/>
          <label for="newPassword" class="form-label">Nueva Contraseña:</label>
          <v-text-field label="Nueva Contraseña" type="password" />
          <label for="repeatNewPassword" class="form-label">Repetir Nueva Contraseña:</label> 
          <v-text-field label="Repetir Nueva Contraseña" type="password" />
        </div>

        <div class="form-container" v-if="!passwordChange">
          <label for="username" class="form-label">Nombre de usuario:</label>
          <v-text-field label="Nombre de usuario" v-model="username" />
          <label for="first_name" class="form-label">Nombre:</label>
          <v-text-field label="Nombre" v-model="first_name" />
          <label for="last_name" class="form-label">Apellidos:</label>
          <v-text-field label="Apellidos" v-model="last_name" />
          <label for="email" class="form-label">Email:</label>
          <v-text-field label="Email" v-model="email" />
        </div>

              
        <div class="form-actions">
          <input 
            class="form-submit" 
            type="submit" 
            :value="passwordChange ? 'Cambiar Contraseña' : 'Actualizar Perfil'"
          >
          <v-card-actions>
            <v-btn 
              color="secondary" 
              @click="requestPasswordChange"
              >
              {{ !passwordChange ? 'Solicitar Cambio de Contraseña' : 'Cancelar Cambio de Contraseña' }}
            </v-btn>
          </v-card-actions>
          <v-card-actions>
            <v-btn color="error" @click="closeAccount">Cerrar Cuenta</v-btn>
          </v-card-actions>
        </div>
    </form>
  </div>

  </template>
  
  <script>
  import axios from 'axios';

  export default {
    data: () => ({
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        passwordRepeat: "",
        show: false,
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
        },
        passwordChange: false,
        user: {
          username: "",
          first_name: "",
          last_name: "",
          email: "",
        },
        urlUser: 'http://localhost:8000/api/v1/users/',
    }),
    async created() {
      this.fetchUser();
      console.log('Obtener datos del perfil');
    },
    methods: {
      fetchUser() {
        console.log('Obtener datos del usuario: FETCH USER');
        const userId = localStorage.getItem('user_id');
        try{
          axios.get(`${this.urlUser}${userId}/detail/`)
            .then(response => {
              this.user = response.data;
              console.log('Datos del usuario', this.user);
              this.username = this.user.username;
              this.first_name = this.user.first_name;
              this.last_name = this.user.last_name;
              this.email = this.user.email;
              console.log('Datos del usuario obtenidos');

            });
        } catch (error) {
          console.log('Error al obtener datos del usuario', error);
        }
      },

      updateProfile() {
        if (this.passwordChange) {
          this.changePassword();
        } else {
          console.log('Actualizar perfil', this.username);
          const updateUser = {
            username: this.username,
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.email,
          };
          console.log('Datos del usuario a actualizar', updateUser);
          try{
            const userId = localStorage.getItem('user_id');
            console.log('ID del usuario a actualizar', userId);
            axios.put(`${this.urlUser}${userId}/update/`, updateUser)
              .then(response => {
                console.log('Perfil actualizado');
                this.fetchUser();
              })
              .catch(error => {
                console.log('Error al actualizar perfil 1', error);
              });
          } catch (error) {
            console.log('Error al actualizar perfil 2', error);
          }
        }
      },
      requestPasswordChange() {
        this.passwordChange = !this.passwordChange;
      },
      changePassword() {
        console.log('Cambiar contraseña');
      },

      closeAccount() {

        console.log('Cerrar cuenta');
      },
    },
  };
  </script>
  <style lang="sass" src="@/assets/sass/pages/profile/_profile.sass" ></style>
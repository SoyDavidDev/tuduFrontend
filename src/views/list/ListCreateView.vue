<template>
    <v-container>
      <v-row>
        <v-col>
          <h1>Listas</h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-sheet>
            <v-form ref="form" @submit.prevent="addList">
              <v-text-field
                v-model="newList.name"
                :counter="40"
                :rules="newList.nameRules"
                label="Nombre de la lista"
              ></v-text-field>
              <v-btn
                color="primary"
                type="submit"
              >Agregar lista</v-btn>
              <v-list>
                <v-list-item
                  v-for="(list, index) in listList"
                  :key="index"
                >
                  <div>
                    <h6>{{ list.name }}</h6>
                  </div>
                </v-list-item>
              </v-list>
            </v-form>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import axios from "axios";
  export default {
    data: () => ({
      newList: {
        name: "",
        nameRules: [
          (v) => !!v || "El nombre es requerido",
          (v) => (v && v.length <= 40) || "El nombre debe tener menos de 40 caracteres",
        ],
        user: 1,
      },
      listList: [],
      urlUser: "http://127.0.0.1:8000/user/",
      urlList: "http://127.0.0.1:8000/list/",
    }),
    mounted() {
      this.getLists();
    },
    methods: {
      getLists() {
        axios
          .get(this.urlList)
          .then((response) => {
            this.listList = response.data;
          })
          .catch((error) => {
            console.error(error);
          });
      },
      addList() {
        if (this.newList.name) {
          var data = {
            name: this.newList.name,
            user: this.newList.user,
          };
          axios
            .post(this.urlList, data)
            .then(() => {
              this.getLists();
              this.newList.name = "";
              this.$refs.form.reset();
            })
            .catch((error) => {
              console.error(error.response);
            });
        }
      },
    }
  };
  </script>
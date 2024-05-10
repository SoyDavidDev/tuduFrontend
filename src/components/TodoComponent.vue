<template>
  <v-container class="container">
    <v-row>
      <v-col>
        <h1>tudús</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-sheet>
          <v-form ref="form" @submit.prevent="addTodo">
            <v-text-field
              v-model="newTodo.title"
              class= "input"
              :counter="40"
              :rules="newTodo.titleRules"
              label="Enter your tudú!"
            ></v-text-field>
            <v-textarea
              v-model="newTodo.description"
              autocomplete="Description"
              label="Description"
              :counter="250"
            ></v-textarea>
            <v-checkbox
              v-model="newTodo.completed"
              label="Is Completed?"
            ></v-checkbox>
            <v-btn
              color="primary"
              type="submit"
              class="mb-5"
            >Add tudú</v-btn>
            <v-list class="todos">
              <v-list-item
                v-for="(todo, index) in todoList"
                :key="index"
                @click="toggleCompleted(index)"
                @contextmenu.prevent="deleteItem(index)"
                :class="{ completed: todo.completed }"
              >
              <div class="d-flex justify-space-between w-100">
                <div class = "v-list-item-component">
                  <h6>{{ todo.title }}</h6>
                  <span class="text-caption">{{ todo.description }}</span>
                </div>
                <v-btn 
                icon @click.stop="editItem(index)"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </div>
              </v-list-item>
            </v-list>
          </v-form>
          <small>Left click to toggle completed,
            <br><strong>Right click to delete</strong>
          </small>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    newTodo: {
      title: "",
      description: "",
      titleRules: [
        (v) => !!v || "Title is required",
        (v) => (v && v.length <= 40) || "Title must be less than 40 characters",
      ],
      completed: false,
      user: 1,
      list: 1,
    },
    todoList: [],
    urlUser: "http://127.0.0.1:8000/user/",
    urlList: "http://127.0.0.1:8000/list/",
    urlTodo: "http://127.0.0.1:8000/todo/",
    editingId: null,
  }),
  mounted() {
    this.getTodos();
  },
  methods: {
    getTodos() {
      axios
        .get(`${this.urlTodo}?ordering=completed`)
        .then((response) => {
          this.todoList = response.data;
          console.log(this.todoList);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    addTodo() {
      if (this.newTodo.title) {
        var data = {
          title: this.newTodo.title,
          completed: this.newTodo.completed,
          user: this.newTodo.user,
          list: this.newTodo.list,
        };
        if (this.newTodo.description) {
          data.description = this.newTodo.description;
        }
        axios
          .post(this.urlTodo, data)
          .then(() => {
            this.getTodos();
            this.newTodo.title = "";
            this.newTodo.description = "";
            this.newTodo.completed = false;
            this.$refs.form.reset();
          })
          .catch((error) => {
            console.error(error.response);
          });
      }
    },
    toggleCompleted(index)  {
      this.todoList[index].completed = !this.todoList[index].completed;
      const url = this.urlTodo + this.todoList[index].id + "/";
      var data = {
        completed: this.todoList[index].completed,
      };
      axios.patch(url, data).then(() => {
        this.getTodos();
      });
    },
    deleteItem(index) {
      const url = this.urlTodo + this.todoList[index].id + "/";
      axios.delete(url).then(() => {
        this.getTodos();
      });
    },
    editItem(index){
      this.newTodo = this.todoList[index];
      this.editingId = this.todoList[index].id;
    }
  }
};
</script>
<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
  * {
    box-sizing: border-box;
  }

  .v-container {
    min-width: 100%;
    background-color: #f5f5f5;
    color: #444;
    font-family: 'Poppins', sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .v-row h1 {
    color: rgb(179, 131, 226);
    font-size: 10rem;
    text-align: center;
    opacity: 0.4;
  }

  .v-form {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    max-width: 100%;
    width: 400px;
  }

  .v-text-field {
    border: none;
    color: #444;
    font-size: 2rem;
    display: block;
    width: 100%;
  }

  .v-text-field::placeholder {
    color: #d5d5d5;
  }

  .v-text-field--is-focused .v-input__slot {
    outline-color: rgb(179, 131, 226);
  }

  .v-list {
    background-color: #fff;
    padding: 0;
    margin: 0;
    list-style-type: none;
  }

  .v-list-item {
    border-top: 1px solid #e5e5e5;
    cursor: pointer;
    font-size: 1.5rem;
    padding: 1rem 2rem;
  }

  .v-list-item.completed {
    color: #b6b6b6;
    text-decoration: line-through;
  }
  .v-icon {
    color: #black;
  }

  small {
    color: #b5b5b5;
    margin-top: 3rem;
    text-align: center;
  } 
</style>

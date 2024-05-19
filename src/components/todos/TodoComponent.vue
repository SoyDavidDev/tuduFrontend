<template>
  <v-container class="container">
    <v-row>
      <v-col>
        <BasicImage
        :src="imageBrand.header.image.src"
        :alt="imageBrand.header.image.alt"
        :width="imageBrand.header.image.width"
        :height="imageBrand.header.image.height"
        :sources="imageBrand.header.image.sources"
        :attrs="imageBrand.header.image.attrs"
        :type="imageBrand.header.image.type"
        :radius="imageBrand.header.image.radius"
        class="container__image"
        />      
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
import BasicImage from '@/components/basic/image/index.vue'

export default {
  components: {
    BasicImage,
  },
  props: ["id", "user_id", "tasks"],

  data() {
    return {
    todos: [],
    name : "TodoComponent",
    newTodo: this.initializeNewTodo(),
    todoList: [],
    urlUser: "http://127.0.0.1:8000/user/",
    urlList: "http://127.0.0.1:8000/list/",
    urlTodo: "http://127.0.0.1:8000/todo/",
    editingId: null,
    imageBrand: require('@/content/basic/branding/text.js')
    };
  },
  async created() {
    try{
      const userData = await this.getUserData(this.user_id);
      console.log('userData', userData)
      console.log('Id de User', this.user_id)
      console.log('Lista número: ' + this.id, userData.lists)
      if (!userData.lists.find((list) => list.id == this.id)){
        console.log('No se encontró la lista');
      } else{
        this.todoList = userData.lists.find((list) => list.id == this.id).todo;
        console.log('Lista de usuario: ' + this.user_id + 
        ' con ID de lista : '+ this.id, this.todoList)
        console.log('Se encontró la lista');
        this.$emit('new-task', this.todoList);
      }
      return userData;
    } catch (error) {
      console.error(error);
      console.log('Error al obtener datos de usuario');
    }
  },
  methods: {
    async getUserData(userId) {
      console.log('ListId', userId);
      try{
        const userResponse = await axios.get(this.urlUser + userId + "/");
        const userData = userResponse.data;
        console.log('userData', userData);

        const listResponse = await axios.get(this.urlList + "?user=" + userId);
        const userLists = listResponse.data;

        for (let list of userLists){
          const todoResponse = await axios.get(this.urlTodo + "?list=" + list.id);
          list.todo = todoResponse.data;
        }
        userData.lists = userLists;
        return userData;
      } catch (error) {
        console.error(error);
        console.log('Error al obtener datos de usuario de get user data');
      }
    },
    initializeNewTodo() {
      return {
        title: "",
        description: "",
        titleRules: [
          (v) => !!v || "Title is required",
          (v) => (v && v.length <= 40) || "Title must be less than 40 characters",
        ],
        completed: false,
        user: this.user_id,
        list: this.id,
      };
    },
    async getTodos() {
      console.log('Id de lista', this.id);
      console.log('Id de usuario', this.user_id);
      axios
        .get(`${this.urlList}${this.id}`)
        .then((response) => {
          console.log('Response de getTodos', response);
          console.log('Data de getTodos', response.data);
          this.todoList = response.data;
          console.log('La lista de todo de este usuario',this.todoList);
          this.$emit('new-task', response.data);
        })
        .catch((error) => {
          console.error(error);
          console.log('Error al obtener todos');
        });
    },
    async mounted() {
    this.getTodos();
    },
    async addTodo() {
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
        try{
          const response = await axios.post(this.urlTodo, data);      
          this.newTodo.title = "";
          this.newTodo.description = "";
          this.newTodo.completed = false;
          this.$refs.form.reset();
          this.todoList.unshift(response.data);

          this.$emit('new-task', response.data);
          console.log('Tarea agregada', response.data);
        } catch (error) {
          console.error(error);
          console.log('Error al agregar todo');
        }
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
    async deleteItem(index) {
      try{
        console.log('Id de item', this.todoList[index].id);
        const url = this.urlTodo + this.todoList[index].id + "/";
        console.log('URL de item', url);
        await axios.delete(url);
        console.log('Item eliminado');
        this.todoList.splice(index, 1);
/*         await this.getTodos();
        this.$router.go(); */
      } catch{
        console.log('Error al eliminar item');
      }
    },
    editItem(index){
      this.newTodo = {...this.todoList[index]};
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

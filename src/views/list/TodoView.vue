<template>
<ShareButton :tasks="tasks" @new-todo='handleNewTask' :isHomeView = "false"/>
<TodoComponent :id="id" :user_id="user_id" :tasks="tasks" @new-task='handleNewTask'/>
</template>

<script>
import TodoComponent from "@/components/todos/TodoComponent.vue";
import ShareButton from "@/components/sharing/ShareButton.vue";
import axios from "axios";

export default {
  name: "TodoView",
  data() {
    return {
      id : this.$route.params.id,
      user_id : localStorage.getItem('user_id'),
      tasks: [],
      urlListsTodos : 'http://localhost:8000/api/v1/lists/',
    };
  },
  components: {
    TodoComponent,
    ShareButton,
  },
  methods: {
    handleNewTask(tasks){
      console.log('NUEVAS TAREAS Todoview', tasks);
      this.tasks = tasks;
    },
  },
  created() {
    console.log('Información CREATED de Todoview');
    console.log('ID:', this.id);
    console.log('USER ID:', this.user_id);
    console.log('TASKS:', this.tasks);
    console.log('FIN Información CREATED de Todoview');
  },
} 


</script>
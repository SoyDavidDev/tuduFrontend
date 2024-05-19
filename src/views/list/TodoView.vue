<template>
<h1>ID LIST: {{ id }}</h1>
<h2> ID USER: {{ user_id }}</h2>
<ShareButton :tasks="tasks" @new-todo='handleNewTask' :isHomeView = "false"/>
<TodoComponent :id="id" :user_id="user_id" :tasks="tasks" @new-task='handleNewTask'/>

</template>

<script>
import TodoComponent from "@/components/todos/TodoComponent.vue";
import ShareButton from "@/components/sharing/ShareButton.vue";

export default {
  name: "TodoView",
  data() {
    return {
      id : this.$route.params.id,
      user_id : this.$route.params.user_id,
      tasks: [],
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
} 


</script>
<template>
  <ShareButton :tasks="sharedTodoList"/>
</template>

<script>
import { defineComponent, ref } from "vue";

// Components
import ShareButton from "@/components/ShareButton.vue";

export default defineComponent({
  name: "HomeView",

  components: {
    ShareButton,
  },
  setup() {
    const sharedTodoList = ref([]);

    return {
      sharedTodoList,
    };
  },
});
</script>

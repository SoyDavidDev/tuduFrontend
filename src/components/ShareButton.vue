<template>
<div>
    <v-btn icon @click='shareOnWhatsApp'>
        <v-icon>mdi-whatsapp</v-icon>
    </v-btn>
    <v-btn icon @click='shareOnEmail'>
        <v-icon>mdi-email</v-icon>
    </v-btn>
    <v-btn icon @click='copyToClipboard'>
        <v-icon>mdi-content-copy</v-icon>
    </v-btn>
    <SharedTodoComponent @new-todo='handleNewTask'/>
</div>
</template>

<script>
import SharedTodoComponent from './SharedTodoComponent.vue';

export default{
    components: {
        SharedTodoComponent
    },
    data(){
        return {
            tasks: []
        }
    },
    methods: {
        handleNewTask(taskList){
            console.log('NUEVAS TAREAS', taskList);
            this.tasks = taskList;
        },
        generateTasksText(){
            console.log('TAREAS', this.tasks);
            let tasksText = '';
            for (let i = 0; i < this.tasks.length; i++) {
                tasksText += `${i + 1}. ${this.tasks[i].title}`;
                if (this.tasks[i].description) {
                    tasksText += ` - ${this.tasks[i].description}`;
                }
                if (this.tasks[i].completed) {
                    tasksText += ' (Completada)';
                } else {
                    tasksText += ' (Pendiente)';
                }
                tasksText += '\n';
            }
            return tasksText;
        },
        shareOnWhatsApp(){
            const text = encodeURIComponent(`Mira mi lista de tareas:\n${this.generateTasksText()}`);
            console.log(text);
            window.open(`https://wa.me/?text=${text}`, '_blank');
        },
        shareOnEmail(){
            const subject = encodeURIComponent('Mi lista de tareas');
            const body = encodeURIComponent(this.generateTasksText());
            console.log(subject, body);
            window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
        },
        copyToClipboard(){
            const tasksText = this.generateTasksText();
            console.log(tasksText);
            navigator.clipboard.writeText(tasksText).then(() => {
                alert('Copiado al portapapeles');
            }).catch(() => {
                alert('Error al copiar al portapapeles');
            });
        },


    }
}
</script>
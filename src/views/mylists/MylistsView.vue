<template>
    <v-container>
        <v-row>
        <v-col cols="12">
            <h1 class="title">Mis listas</h1>
        </v-col>
        </v-row>

        <v-row>
        <v-col cols="12">
            <v-btn 
                color="primary" 
                text to="/list/create"
                >
                Crear lista
            </v-btn>
        </v-col>
        </v-row>
        
        <v-row>
        <v-col cols="12" sm="6" md="4" lg="3" v-for="list in lists" :key="list.id">
            <v-card @click = "goToListDetail(list.id, list.user_id)">
            <v-card-title>{{ list.name }}</v-card-title>
            <v-card-text>
                <h2> ID de usuario: {{ list.user_id }}</h2>
                <h3> ID de lista: {{ list.id }}</h3>
                <p>Guardada: {{ list.saved ? 'Sí' : 'No' }}</p>
                <p>Compartida: {{ list.shared ? 'Sí' : 'No' }}</p>
                <p>Creada: {{ new Date(list.created_at).toLocaleDateString() }}</p>
                <p>Tareas:</p>
                <ul>
                    <li v-for="todo in list.todo" :key="todo.id">
                        {{ todo.title }} - {{ todo.completed ? 'Completada' : 'Pendiente' }}
                    </li>
                </ul>
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" @click.stop = "goToEditList(list.id, list.user_id)">Editar</v-btn>
                <v-btn color="error" @click="deleteList(list.id)">Eliminar</v-btn>
            </v-card-actions>
            </v-card>
        </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            lists: [],
            newList: {
                name: '',
                saved: false,
                shared: false,
                user_id: null,
                created_at: new Date().toISOString(),
            }            
        }
    },
    async created() {
        try {
            const response = await axios.get('http://localhost:8000/list/');
            console.log('Response de created',response);
            this.lists = response.data;
            console.log('Listas', this.lists)
            for (let listuser of this.lists){
                console.log('Id de Lista', listuser.id);
                console.log('Listas de usuario', listuser.user_id);
            }
        } catch (error) {
            console.log(error);
            console.log('Error al cargar listas');
        }
    },
    methods: {
        goToListDetail(id, user_id){
            this.$router.push({ 
                name: 'TodoView', 
                params: { id: id, user_id: user_id } 
            });
        },
        async goToEditList(id, user_id){
            console.log('ID de lista', id);
            console.log('ID de usuario', user_id);
            this.$router.push({ 
                name: 'ListEditView', 
                params: { id: id , user_id: user_id}
            });
        },
        async deleteList(id){
            try {
                await axios.delete(`http://localhost:8000/list/${id}/`);
                this.lists = this.lists.filter(list => list.id !== id);
                this.$router.push('/mylists');
            } catch (error) {
                console.log(error);
                console.log('Error al eliminar lista');
            }
        },
    }
}
</script>
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
        
        <v-row v-for="list of lists" :key="list.id">
            
            <v-card
            class="mx-auto"
            max-width="344"
            hover
            >
            <v-card-item @click.stop="goToList(list.user_id, list.id)">
                <v-card-title>
                Título lista {{ list.title }}
                </v-card-title>
                <v-card-subtitle>
                Lista usuario número:    {{ list.user_id }}
                Número lista;   {{ list.id }}
                </v-card-subtitle>
                <!-- Botón para editar y eliminar -->
                <v-card-actions>
                <v-btn
                    color="primary"
                    text
                    @click.stop="goToEditList(list.user_id, list.id)"
                >
                    Editar
                </v-btn>
                <v-btn
                    color="error"
                    text
                    @click.stop="deleteList(list.id)"
                >
                    Eliminar
                </v-btn>
                </v-card-actions>
            </v-card-item>

            </v-card>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            lists: [],
            urlLists: "http://127.0.0.1:8000/api/v1/lists/"
        }
    },
    
    created() {
        this.fetchLists();
    },
    methods: {
        fetchLists() {
            const userId = localStorage.getItem('user_id');
            console.log('User ID:',userId);
            axios.get(`http://127.0.0.1:8000/api/v1/users/${userId}/lists/`)
                .then(response => {
                    this.lists = response.data;
                    console.log('Las listas',this.lists);
                })
                .catch(error => {
                    console.error('Error fetching lists:', error);
                });
        },

        goToEditList(userId, listId) {
        setTimeout(() => {
            this.$router.push(`/list/edit/${userId}/${listId}`);
        }, 0);
        },
        goToList(userId, listId) {
            this.$router.push(`/list/${userId}/${listId}`);
        },
        deleteList(listId){
            axios.delete(this.urlLists + listId + '/delete/')
            .then(response => {
                console.log('List deleted:', response);
                this.fetchLists();
            })
            .catch(error => {
                console.error('Error deleting list:', error);
            });
        }

    }
}
</script>
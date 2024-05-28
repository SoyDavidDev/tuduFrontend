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
                class="create" 
                color="primary" 
                text to="/list/create"
                >
                Crear lista
            </v-btn>
        </v-col>
        </v-row>
        
        <v-row>
            <v-col
            v-for="list of lists" 
            :key="list.id"
            cols="12"
            sm="6"
            md="4"
            lg="3"
            >
                <v-card
                    class="mx-auto"
                    max-width="344"
                    hover
                >
                    <v-card-item @click.stop="goToList(list.user_id, list.id)">
                        <v-card-title>
                            {{ list.title }}
                        </v-card-title>
                    </v-card-item>
                    <div class="buttons">
                        <v-btn
                        class="edit"
                        append-icon="mdi-account-circle"
                        text
                        @click.stop="goToEditList(list.user_id, list.id)"
                        >
                        <template v-slot:append>
                            <v-icon>mdi-pencil</v-icon>
                        </template>
                        Editar
                        </v-btn>

                        <v-btn
                        class="delete"
                        text
                        @click.stop="deleteList(list.id)"
                        >
                        <template v-slot:append>
                            <v-icon>mdi-delete</v-icon>
                        </template>
                        Eliminar
                        </v-btn>
                    </div>
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
            urlLists: "http://127.0.0.1:8000/api/v1/lists/",
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
<style lang="sass" src="@/assets/sass/pages/mylists/_mylists.sass" ></style>
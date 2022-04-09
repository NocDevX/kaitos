<template>
    <h2>Home Page</h2>
    <div class="buttons">
        <button role="button" class="btn" @click="getUsers">Get users</button>
        <router-link class="btn" to="/auth">Auth</router-link>
    </div>

    <div v-if="users.length > 0">
        <h4>Response</h4>
        <ul>
            <li v-for="user in users" :key="user.id">
                {{ user.title.charAt(0).toUpperCase() + user.title.slice(1) }}. {{ user.firstName }}
                {{ user.lastName }}
            </li>
        </ul>
    </div>
</template>

<script>
import api from '../assets/js/api.js';

export default {
    data() {
        return { users: [] };
    },
    methods: {
        getUsers: function () {
            api.get('user')
                .then((res) => {
                    this.users = res.data.data;
                })
                .catch(function (error) {
                    console.log(error.toJSON().message);
                    if (error.response) {
                        alert('Response error: ' + error.toJSON().message);
                    } else if (error.request) {
                        alert('Request error: ' + error.toJSON().message);
                    } else {
                        alert('Error', error.message);
                    }
                });
        },
    },
};
</script>

<template>
    <h2>Muito Conteúdo</h2>
    <div class="buttons">
        <router-link class="btn" to="/auth">Autenticar</router-link>
        <br />
        <a href="#" class="text-danger" @click="logout">Logout</a>
    </div>
</template>

<script>
export default {
    methods: {
        logout() {
            document.cookie = 'XSRF-TOKEN=1;expires=' + new Date();
            document.cookie = 'UID=1;expires=' + new Date();

            alert('logged Out');

            this.$router.push({ name: 'auth' });
        },
    },
};
</script>

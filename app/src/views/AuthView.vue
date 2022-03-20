<template>
    <div class="container">
        <TheLogin @login="setLoginState" v-if="login" />
        <TheRegister @login="setLoginState" v-if="!login" />
    </div>
</template>

<style>
.container {
    background: #333;
}
</style>

<script>
import TheLogin from '../components/Auth/TheLogin.vue';
import TheRegister from '../components/Auth/TheRegister.vue';

export default {
    components: {
        TheLogin,
        TheRegister,
    },
    data() {
        return {
            login: true,
        };
    },
    methods: {
        setLoginState(state) {
            this.login = state;
        },
    },
};
</script>

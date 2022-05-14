<template>
    <div class="auth">
        <div class="auth-container">
            <div class="auth-title">
                <h2 class="title">Entre em sua conta</h2>
                <span
                    >Não possui conta?
                    <span class="btn" @click="$emit('switchComponent', 'TheRegister')">Cadastre-se</span>
                </span>
            </div>

            <AuthWithService type="login" />

            <hr />

            <div class="form-container">
                <form action="" class="auth-form">
                    <input type="text" class="input" name="email" placeholder="Email" />

                    <input type="password" class="input" name="password" placeholder="Senha" />
                </form>

                <small><a href="#" class="btn">Esqueceu sua senha?</a></small>

                <button class="auth-btn" @click="login">Entrar</button>
            </div>
        </div>
    </div>
</template>

<script>
import AuthWithService from './AuthWithService.vue';

export default {
    components: {
        AuthWithService,
    },
    methods: {
        login() {
            let expireTime = new Date(Date.now() + 1000 * (60 * 10)).toUTCString();
            document.cookie = `authenticated=true;expires=${expireTime}`;

            alert('Logged In!');
        },
    },
};
</script>

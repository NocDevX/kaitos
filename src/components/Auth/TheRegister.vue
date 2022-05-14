<template>
    <div class="auth">
        <div class="auth-container">
            <div class="auth-title">
                <h2 class="title">Crie sua conta</h2>
                <span
                    >Já possui conta?
                    <span class="btn" @click="$emit('switchComponent', 'TheLogin')">Login</span>
                </span>
            </div>

            <AuthWithService type="register" />

            <hr />

            <div class="form-container">
                <form action="/login" class="auth-form">
                    <input type="text" class="input" name="username" placeholder="Nome de usuário" />

                    <input type="text" class="input" name="email" placeholder="Email" />

                    <input type="password" class="input" name="password" placeholder="Senha" />
                </form>

                <button class="auth-btn">Cadastrar</button>
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
};
</script>

<template>
    <div class="login">
        <div class="login-container">
            <div class="login-title">
                <h2 class="title">Entre em sua conta</h2>
                <span
                    >Não possui conta?
                    <span class="btn" @click="$emit('switchComponent', 'TheRegister')">Cadastre-se</span>
                </span>
            </div>

            <AuthWithService type="login" />

            <hr />

            <div class="form-container">
                <form action="" class="login-form">
                    <input type="text" class="input" name="email" placeholder="Email" />

                    <input type="password" class="input" name="password" placeholder="Senha" />
                </form>

                <small><a href="#" class="btn">Esqueceu sua senha?</a></small>

                <button class="login-btn" @click="login">Entrar</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.login {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    width: 100%;
    height: 100%;
}

.login-container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    background: #fff;
    overflow: auto;
    border-radius: 0.6rem;
    width: 85%;
    height: 70%;
    box-shadow: 0 0 20px 2px #bbb;
}

.login-title {
    align-self: center;
    line-height: 0.6rem;
    margin-bottom: 1rem;
}

.title {
    text-align: center;
}

hr {
    height: 1px;
    width: 80%;
    border: 0;
    background-color: #ddd;
}

.btn {
    color: var(--kaitos-purple-3);
    cursor: pointer;
}

.btn:hover {
    text-decoration: underline;
}

.form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.login-form {
    width: 100%;
}

.input {
    display: block;
    border: 1px solid #bbb;
    outline: 0;
    border-radius: 0.3rem;
    padding: 0.6rem;
    margin: 0.6rem auto;
    width: 80%;
}

.input:focus {
    border-color: var(--kaitos-purple-5);
}

.login-btn {
    margin-top: 1rem;
    padding: 0.6rem;
    width: 80%;
    border: 1px solid var(--kaitos-purple-3);
    background-color: var(--kaitos-purple-3);
    border-radius: 0.4rem;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;
}

.login-btn:hover {
    background-color: var(--kaitos-purple-4);
    border-color: 0;
}

.login-btn:active {
    background-color: var(--kaitos-purple-5);
}

@media (min-width: 768px) and (min-height: 600px) {
    .login {
        height: 100%;
    }
    .login-container {
        width: 30%;
    }
}

@media (min-height: 800px) {
    .login-container {
        width: 80%;
    }
}
</style>

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

<template>
    <div class="register-options">
        <button class="facebook">
            <b v-if="type === 'login'">Entrar com Facebook</b>
            <b v-else-if="type === 'register'">Cadastrar com Facebook</b>
        </button>

        <button class="google">
            <b v-if="type === 'login'">Entrar com Google</b>
            <b v-if="type === 'register'">Cadastrar com Google</b>
        </button>
    </div>
</template>

<style>
.register-options {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.facebook,
.google {
    margin: 0.3rem auto;
    padding: 0.3rem;
    border-radius: 0.3rem;
    border: 1px solid #ddd;
    width: 80%;
    text-align: center;
    background: 0;
    cursor: pointer;
    transition: background-color 0.2s;
}

.facebook:hover {
    background-color: #4361ee;
    color: white;
}

.facebook:active {
    background-color: #3f37c9;
}

.google:hover {
    background-color: #f24b04;
    color: white;
}

.google:active {
    background-color: #d00000;
}
</style>

<script>
export default {
    props: {
        type: String,
    },
};
</script>

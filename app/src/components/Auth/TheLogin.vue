<template>
    <div class="login">
        <div class="login-container">
            <div class="login-title">
                <h2>Entre com sua conta</h2>
                <span
                    >Ainda não tem conta? <span class="btn" @click="$emit('login', false)">Cadastre-se</span>
                </span>
            </div>

            <form action="" class="login-form">yada</form>
        </div>
    </div>
</template>

<style scoped>
.login {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100vh;
}

.login-container {
    display: flex;
    flex-direction: column;
    background: #efefef;
    border-radius: 0.6rem;
    padding: 1rem 2rem;
    margin-left: 6rem;
    height: 65%;
    width: 50%;
}

.login-title {
    line-height: 0.6rem;
    margin-bottom: 1rem;
}

.login-form {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.btn {
    color: plum;
    cursor: pointer;
}

.btn:hover {
    text-decoration: underline;
}
</style>

<template>
    <div class="register">
        <div class="register-container">
            <div class="register-title">
                <h2>Cadastre-se</h2>
                <span
                    >Já possui conta? <span class="btn" @click="$emit('login', true)">Faça login</span>
                </span>
            </div>

            <form action="" class="register-form">dame</form>
        </div>
    </div>
</template>

<style scoped>
.register {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    height: 100vh;
}

.register-container {
    display: flex;
    flex-direction: column;
    background: #efefef;
    border-radius: 0.6rem;
    padding: 1rem 2rem;
    margin-right: 6rem;
    height: 65%;
    width: 50%;
}

.register-title {
    line-height: 0.6rem;
    margin-bottom: 1rem;
}

.register-form {
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

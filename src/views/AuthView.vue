<template>
    <div class="container">
        <a href="/"><img src="../assets/img/logo.png" class="logo" /></a>

        <Transition name="slide-left">
            <component :is="activeComponent" @switch-component="setActiveComponent"></component>
        </Transition>
    </div>
</template>

<style>
.container {
    background-color: #efefef;
    position: absolute;
    overflow: hidden;
    width: 100vw;
    min-width: 400px;
    height: 100vh;
}

.logo {
    width: 20rem;
    margin: 2rem auto 2rem auto;
    display: block;
}
.slide-left-enter-active {
    transition: all 0.3s ease-out;
}

.slide-left-leave-active {
    transition: all 0.3s;
}

.slide-left-leave-to {
    opacity: 0;
}

.slide-left-enter-from {
    transform: translateX(30px);
    opacity: 0;
}

.auth {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    width: 100%;
    height: 100%;
}

.auth-container {
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

.auth-title {
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

.auth-form {
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

.auth-btn {
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

.auth-btn:hover {
    background-color: var(--kaitos-purple-4);
    border-color: 0;
}

.auth-btn:active {
    background-color: var(--kaitos-purple-5);
}

@media (min-height: 700px) {
    .auth-container {
        height: 60%;
    }
}

@media (min-height: 1000px) {
    .auth-container {
        height: 40%;
    }
}

@media (min-width: 500px) {
    .auth-container {
        width: 60%;
    }
}

@media (min-width: 768px) {
    .auth-container {
        width: 50%;
    }
}

@media (min-width: 1000px) {
    .auth-container {
        width: 45%;
    }
}

@media (min-width: 1280px) {
    .auth-container {
        width: 30%;
    }
}

@media (min-width: 1600px) {
    .auth-container {
        width: 20%;
    }
}

@media (min-width: 2000px) {
    .auth-container {
        width: 20%;
    }
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
            transition: 'slide-left',
            activeComponent: 'TheLogin',
        };
    },
    methods: {
        setActiveComponent(componentName) {
            this.activeComponent = componentName;
        },
    },
};
</script>

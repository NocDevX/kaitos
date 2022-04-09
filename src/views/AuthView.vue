<template>
    <div class="container">
        <a href="/"><img src="../assets/img/logo.png" class="logo" /></a>

        <Transition name="slide-left">
            <component :is="activeComponent" @switch-component="setActiveComponent"></component>
        </Transition>
    </div>
</template>

<style scoped>
.container {
    background-color: #efefef;
    position: absolute;
    overflow: hidden;
    width: 100vw;
    height: 100vh;
    min-height: 600px;
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

<template>
    <h2>Authentication</h2>
    <div class="buttons">
        <button role="button" class="btn" @click="authenticate">Authorize</button>
        <button role="button" class="btn" @click="logout">Logout</button>
        <router-link class="btn" to="/">Home</router-link>
    </div>
</template>

<style>
h2 {
    text-align: center;
}

.buttons {
    display: flex;
    justify-content: center;
}

.btn {
    font-size: 1rem;
    margin: auto 0.6rem;
    padding: 1rem;
    border: 1px solid #333;
    color: #efefef;
    background: blueviolet;
    cursor: pointer;
    text-decoration: none;
}

.btn:active {
    background: purple;
}

.d-flex {
    display: flex;
}
</style>

<script>
export default {
    data() {
        return { users: [] };
    },
    methods: {
        authenticate: function () {
            window.localStorage.setItem('authenticated', true);
            window.location.href = window.location.origin;
            alert('Logged in!');
        },
        logout: function () {
            window.localStorage.removeItem('authenticated');
            alert('Logged out!');
        },
    },
};
</script>

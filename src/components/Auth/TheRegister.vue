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
                    <input type="text" class="input" name="name" placeholder="Nome de usuário" />

                    <input type="text" class="input" name="email" placeholder="Email" />

                    <input type="password" class="input" name="password" placeholder="Senha" />
                    <button class="auth-btn" @click="register($event)">Cadastrar</button>
                </form>
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
        register(event) {
            event.preventDefault();

            let toastOptions = {
                duration: 3000,
                close: true,
                gravity: 'top',
                position: 'right',
                stopOnFocus: true,
            };

            api.post('auth/register', {
                name: $('input[name=name]').val(),
                password: $('input[name=password]').val(),
                email: $('input[name=email]').val(),
            })
                .then(() => {
                    toastOptions.text = 'Usuário cadastrado!';
                    toastOptions.className = 'toast-success';

                    Toastify(toastOptions).showToast();

                    this.$emit('switchComponent', 'TheLogin');
                })
                .catch((error) => {
                    let responseData = error.response.data;
                    toastOptions.className = 'toast-danger';

                    if (responseData.message) {
                        toastOptions.text = responseData.message;
                        Toastify(toastOptions).showToast();
                    }

                    let toastDuration = toastOptions.duration;

                    if (typeof responseData === 'object' && !responseData.message) {
                        const responseDataLength = Object.keys(responseData).length;
                        const maxDuration = responseDataLength * toastOptions.duration;
                        let dataCounter = 1;

                        for (let index in responseData) {
                            toastDuration = maxDuration / dataCounter;
                            dataCounter++;

                            toastOptions.text = responseData[index][0];
                            toastOptions.duration = toastDuration;

                            Toastify(toastOptions).showToast();
                        }
                    }
                });
        },
    },
};
</script>

<template>
    <div class="auth">
        <div class="auth-container">
            <div class="auth-title">
                <h2 class="title">Entre em sua conta</h2>
                <span>Não possui conta? </span>
                <span class="btn" @click="$emit('switchComponent', 'TheRegister')">Cadastre-se</span>
            </div>

            <AuthWithService type="login" />

            <hr />

            <div class="form-container">
                <form class="auth-form">
                    <div v-for="(error, index) of v$.form.email.$errors" :key="index" style="width: 80%">
                        <small class="text-danger">{{ error.$validator }}</small>
                    </div>
                    <input
                        type="text"
                        :class="v$.form.email.$errors.length > 0 ? 'border-danger input' : 'input'"
                        name="email"
                        placeholder="Email"
                        v-model="v$.form.email.$model"
                    />

                    <div
                        class="input-errors"
                        v-for="(error, index) of v$.form.password.$errors"
                        :key="index"
                        style="width: 80%"
                    >
                        <small class="text-danger">{{ error.$validator }}</small>
                    </div>
                    <input
                        type="password"
                        :class="v$.form.password.$errors.length > 0 ? 'border-danger input' : 'input'"
                        name="password"
                        placeholder="Senha"
                        v-model="v$.form.password.$model"
                    />

                    <small><a href="#" class="btn">Esqueceu sua senha?</a></small>

                    <button class="auth-btn" @click="login($event)">Entrar</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import AuthWithService from './AuthWithService.vue';
import useVuelidate from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';

export default {
    components: {
        AuthWithService,
    },
    setup() {
        return {
            v$: useVuelidate(),
        };
    },
    data() {
        return {
            form: {
                email: '',
                password: '',
            },
        };
    },
    validations() {
        return {
            form: {
                email: {
                    'O email não pode estar vazio.': required,
                    'Formato de email inválido.': email,
                },
                password: {
                    'A senha não pode estar vazia.': required,
                },
            },
        };
    },
    methods: {
        login(event) {
            event.preventDefault();

            let toastOptions = {
                duration: 4000,
                close: true,
                gravity: 'top',
                position: 'right',
                stopOnFocus: true,
            };

            if (this.v$.form.$invalid) {
                toastOptions.text = 'O formulário está incompleto ou incorreto.';
                toastOptions.className = 'toast-danger';
                Toastify(toastOptions).showToast();

                return;
            }

            toastOptions.text = 'Verificando credenciais...';
            Toastify(toastOptions).showToast();

            api.get('csrf_cookie')
                .then(() => {
                    api.post('auth/login', {
                        password: $('input[name=password]').val(),
                        email: $('input[name=email]').val(),
                    })
                        .then(() => {
                            let midnight = new Date();
                            midnight.setHours(23, 59, 59, 0);

                            toastOptions.text = 'Autenticado com sucesso!';
                            toastOptions.className = 'toast-success';
                            Toastify(toastOptions).showToast();

                            this.$router.push({ name: 'home' });
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
                })
                .catch((e) => alert('Não foi possível autenticar a requisição com o servidor'));
        },
    },
};
</script>

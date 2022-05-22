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

                    <button class="auth-btn" @click="login($event)" :disabled="isLoading">
                        <font-awesome-icon
                            :class="{ 'd-none': !isLoading, 'ms-3': true }"
                            :icon="['fas', 'spinner']"
                            :spin="isLoading ? true : null"
                        />Entrar
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import AuthWithService from './AuthWithService.vue';
import useVuelidate from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
import api from '../../assets/js/api';

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
            isLoading: false,
            toastOptions: {
                duration: 4000,
                close: true,
                gravity: 'top',
                position: 'right',
                stopOnFocus: true,
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
        async login(event) {
            event.preventDefault();

            this.isLoading = true;

            if (this.v$.form.$invalid) {
                this.toastOptions.text = 'O formulário está incompleto ou incorreto.';
                this.toastOptions.className = 'toast-danger';

                Toastify(this.toastOptions).showToast();
                this.isLoading = false;

                return false;
            } else {
                this.isLoading = true;
                this.toastOptions.text = 'Verificando credenciais...';
                this.toastOptions.className = '';
                Toastify(this.toastOptions).showToast();
            }

            const csrfCookie = api.get('csrf_cookie');
            await csrfCookie;

            const login = api
                .post('auth/login', {
                    password: $('input[name=password]').val(),
                    email: $('input[name=email]').val(),
                })
                .then(response => this.successfulLogin(response))
                .catch(error => this.failedLogin(error));

            await login;

            this.isLoading = false;
        },
        successfulLogin(response) {
            const uid = response.data.token ? response.data.token : '';

            const midnight = new Date();
            midnight.setHours(23, 59, 59, 0);

            this.toastOptions.text = 'Autenticado com sucesso!';
            this.toastOptions.className = 'toast-success';
            Toastify(this.toastOptions).showToast();

            document.cookie = `UID=${uid};expires=${midnight}`;

            this.$router.push({ name: 'home' });
        },
        failedLogin(error) {
            let responseData = error.response.data;
            this.toastOptions.className = 'toast-danger';

            if (responseData.message) {
                this.toastOptions.text = responseData.message;
                Toastify(this.toastOptions).showToast();
            }

            let toastDuration = this.toastOptions.duration;

            if (typeof responseData === 'object' && !responseData.message) {
                const responseDataLength = Object.keys(responseData).length;
                const maxDuration = responseDataLength * this.toastOptions.duration;
                let dataCounter = 1;

                for (let index in responseData) {
                    toastDuration = maxDuration / dataCounter;
                    dataCounter++;

                    this.toastOptions.text = responseData[index][0];
                    this.toastOptions.duration = toastDuration;

                    Toastify(this.toastOptions).showToast();
                }
            }
        },
        old() {
            // await api
            //     .get('csrf_cookie')
            //     .then(() => {
            //         api.post('auth/login', {
            //             password: $('input[name=password]').val(),
            //             email: $('input[name=email]').val(),
            //         })
            //             .then(() => {
            //                 let midnight = new Date();
            //                 midnight.setHours(23, 59, 59, 0);
            //                 this.toastOptions.text = 'Autenticado com sucesso!';
            //                 this.toastOptions.className = 'toast-success';
            //                 Toastify(this.toastOptions).showToast();
            //                 this.$router.push({ name: 'home' });
            //             })
            //             .catch((error) => {
            //                 let responseData = error.response.data;
            //                 this.toastOptions.className = 'toast-danger';
            //                 if (responseData.message) {
            //                     this.toastOptions.text = responseData.message;
            //                     Toastify(this.toastOptions).showToast();
            //                 }
            //                 let toastDuration = this.toastOptions.duration;
            //                 if (typeof responseData === 'object' && !responseData.message) {
            //                     const responseDataLength = Object.keys(responseData).length;
            //                     const maxDuration = responseDataLength * this.toastOptions.duration;
            //                     let dataCounter = 1;
            //                     for (let index in responseData) {
            //                         toastDuration = maxDuration / dataCounter;
            //                         dataCounter++;
            //                         this.toastOptions.text = responseData[index][0];
            //                         this.toastOptions.duration = toastDuration;
            //                         Toastify(this.toastOptions).showToast();
            //                     }
            //                 }
            //             });
            //     })
            //     .catch((e) => {
            //         alert('Não foi possível autenticar a requisição com o servidor');
            //     });
        },
    },
};
</script>

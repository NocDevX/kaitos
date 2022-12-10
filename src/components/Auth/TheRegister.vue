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
                <form class="auth-form">
                    <div v-for="(error, index) of v$.form.name.$errors" :key="index" style="width: 80%">
                        <small class="text-danger">{{ error.$validator }}</small>
                    </div>
                    <input
                        type="text"
                        :class="v$.form.name.$errors.length > 0 ? 'border-danger input' : 'input'"
                        name="name"
                        placeholder="Nome de usuário"
                        v-model="v$.form.name.$model"
                    />

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

                    <button class="auth-btn" @click="register($event)" :disabled="isLoading">
                        <font-awesome-icon
                            :class="{ 'd-none': !isLoading, 'ms-3': true }"
                            :icon="['fas', 'spinner']"
                            :spin="isLoading ? true : null"
                        >
                        </font-awesome-icon>
                        Cadastrar
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import AuthWithService from './AuthWithService.vue';
import useVuelidate from '@vuelidate/core';
import { required, email, minLength } from '@vuelidate/validators';

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
                name: '',
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
                name: {
                    'O nome não pode estar vazio.': required,
                },
                password: {
                    'A senha não pode estar vazia.': required,
                    'A senha deve conter ao menos 12 caracteres.': minLength(12),
                },
            },
        };
    },
    methods: {
        async register(event) {
            event.preventDefault();

            if (this.v$.form.$invalid) {
                this.toastOptions.text = 'O formulário está incompleto ou incorreto.';
                this.toastOptions.className = 'toast-danger';

                Toastify(this.toastOptions).showToast();
                this.isLoading = false;

                return false;
            } else {
                this.isLoading = true;
                this.toastOptions.text = 'Cadastrando usuário...';
                this.toastOptions.className = '';
                Toastify(this.toastOptions).showToast();
            }

            const csrfCookie = api.get('csrf_cookie');
            await csrfCookie;

            const register = api
                .post('auth/register', {
                    name: $('input[name=name]').val(),
                    password: $('input[name=password]').val(),
                    email: $('input[name=email]').val(),
                })
                .then(() => this.successfulRegister())
                .catch(error => this.failedRegister(error));

            await register;

            this.isLoading = false;
        },
        successfulRegister() {
            this.toastOptions.text = 'Usuário cadastrado!';
            this.toastOptions.className = 'toast-success';

            Toastify(this.toastOptions).showToast();

            this.$emit('switchComponent', 'TheLogin');
        },
        failedRegister(error) {
            let responseData = error.response.data;
            let toastDuration = this.toastOptions.duration;

            this.toastOptions.className = 'toast-danger';

            if (responseData.message) {
                this.toastOptions.text = responseData.message;
                Toastify(this.toastOptions).showToast();
            }

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
    },
};
</script>

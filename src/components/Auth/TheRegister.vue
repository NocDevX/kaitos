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
                    <button class="auth-btn" @click="register($event)">Cadastrar</button>
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
                    'A deve conter ao menos 12 caracteres.': minLength(12),
                },
            },
        };
    },
    methods: {
        register(event) {
            event.preventDefault();

            let toastOptions = {
                duration: 4000,
                close: true,
                gravity: 'top',
                position: 'right',
                stopOnFocus: true,
            };

            console.log(this.v$.form.$errors);

            if (this.v$.form.$invalid) {
                toastOptions.text = 'O formulário está incompleto ou incorreto.';
                toastOptions.className = 'toast-danger';
                Toastify(toastOptions).showToast();

                return;
            }

            api.get('csrf_cookie').then(() => {
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
            });
        },
    },
};
</script>

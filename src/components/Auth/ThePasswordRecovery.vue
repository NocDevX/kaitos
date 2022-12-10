<template>
    <div class="auth">
        <div class="auth-container">
            <div class="auth-title">
                <h2 class="title">Recuperar senha</h2>
                <span>Voltar para o </span>
                <span class="btn" @click="$emit('switchComponent', 'TheLogin')">login</span>
            </div>

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

                    <button class="auth-btn" :disabled="isLoading" @click="recoverPassword($event)">
                        <font-awesome-icon
                            :class="{ 'd-none': !isLoading, 'ms-3': true }"
                            :icon="['fas', 'spinner']"
                            :spin="isLoading ? true : null"
                        />
                        Enviar email
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';

export default {
    setup() {
        return {
            v$: useVuelidate(),
        };
    },
    data() {
        return {
            form: {
                email: '',
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
            },
        };
    },
    methods: {
        async recoverPassword(event) {
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

            const recoverPassword = new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve('123');
                }, 300);
            });
            
            await recoverPassword;

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
    },
};
</script>

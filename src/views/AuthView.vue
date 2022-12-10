<template>
    <div class="container">
        <img src="../assets/img/logo.png" alt="logo do site" class="logo" draggable="false"/>

        <Transition name="slide-left">
            <component
                :is="activeComponent"
                @switch-component="setActiveComponent"
                @failed-authentication="failedAuthentication"
            >
            </component>
        </Transition>
    </div>
</template>

<style scoped>
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
    transform: translateX(-30px);
    opacity: 0;
}

:deep(.auth) {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    width: 100%;
    height: 75vh;
    min-width: 380px;
}

:deep(.auth-container) {
    display: flex;
    justify-content: center;
    flex-direction: column;
    background: #fff;
    overflow: auto;
    border-radius: 0.6rem;
    width: 85%;
    height: 100%;
    min-height: 475px;
    box-shadow: 0 0 20px 2px #bbb;
}

:deep(.auth-title) {
    align-self: center;
    text-align: center;
    line-height: 0.6rem;
    margin-bottom: 1rem;
}

:deep(.title) {
    text-align: center;
}

:deep(hr) {
    height: 1px;
    width: 80%;
    border: 0;
    background-color: #ddd;
}

:deep(.btn) {
    color: var(--kaitos-purple-3);
    cursor: pointer;
}

:deep(.btn:hover) {
    text-decoration: underline;
}

:deep(.form-container) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

:deep(.auth-form) {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
}

:deep(.label) {
    margin: 0.6rem auto;
    width: 80%;
    height: 10px;
    display: block;
}

:deep(.input) {
    display: block;
    border: 1px solid #bbb;
    outline: 0;
    border-radius: 0.3rem;
    padding: 0.6rem;
    margin: 0.6rem auto;
    width: 80%;
}

:deep(.input:focus) {
    border-color: var(--kaitos-purple-5);
}

:deep(.auth-btn) {
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

:deep(.auth-btn:hover) {
    background-color: var(--kaitos-purple-4);
    border-color: 0;
}

:deep(.auth-btn:active) {
    background-color: var(--kaitos-purple-5);
}

@media (min-height: 700px) {
    :deep(.auth-container) {
        height: 60%;
    }
}

@media (min-height: 1000px) {
    :deep(.auth-container) {
        height: 40%;
    }
}

@media (min-width: 500px) {
    :deep(.auth-container) {
        width: 60%;
    }
}

@media (min-width: 768px) {
    :deep(.auth-container) {
        width: 50%;
    }
}

@media (min-width: 1000px) {
    :deep(.auth-container) {
        width: 45%;
    }
}

@media (min-width: 1280px) {
    :deep(.auth-container) {
        width: 30%;
    }
}

@media (min-width: 1600px) {
    :deep(.auth-container) {
        width: 20%;
    }
}
</style>

<script>
import TheLogin from '../components/Auth/TheLogin.vue';
import TheRegister from '../components/Auth/TheRegister.vue';
import ThePasswordRecovery from '../components/Auth/ThePasswordRecovery.vue';

export default {
    components: {
        TheLogin,
        TheRegister,
        ThePasswordRecovery,
    },
    data() {
        return {
            transition: 'slide-left',
            activeComponent: 'TheLogin',
            toastOptions: {
                duration: 4000,
                close: true,
                gravity: 'top',
                position: 'right',
                stopOnFocus: true,
            },
        };
    },
    methods: {
        setActiveComponent(componentName) {
            this.activeComponent = componentName;
        },
        failedAuthentication(request) {
            this.toastOptions.className = 'toast-danger';
            let responseMessage = this.getRequestMessage(request);

            if (responseMessage) {
                this.toastOptions.text = responseMessage;
                // eslint-disable-next-line no-undef
                Toastify(this.toastOptions).showToast();
                return;
            }

            let responseData = request.response.data;
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

                    // eslint-disable-next-line no-undef
                    Toastify(this.toastOptions).showToast();
                }
            }
        },
        getRequestMessage(request) {
            if (request.message !== undefined) {
                return request.message;
            }

            if (request.response.data.message !== undefined) {
                return request.response.data.message;
            }

            return false;
        }
    },
};
</script>

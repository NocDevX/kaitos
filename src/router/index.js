import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AuthView from '../views/AuthView.vue';
import NotFoundView from '../views/NotFoundView.vue';

const routes = [
    {
        path: '/auth',
        name: 'auth',
        component: AuthView,
        meta: {
            redirectIfAuthenticated: true,
        },
    },
    {
        path: '/',
        name: 'home',
        component: HomeView,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'notFound',
        component: NotFoundView,
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,
});

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (getCookie('XSRF-TOKEN') === false) {
            next('/auth');
        } else {
            next();
        }
    } else if (to.matched.some((record) => record.meta.redirectIfAuthenticated)) {
        if (getCookie('XSRF-TOKEN') === false) {
            next();
        }
    } else {
        next();
    }
});

export default router;

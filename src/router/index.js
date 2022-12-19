import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/index.js'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            layout: 'main',
            auth: true,
        },
    },
    {
        path: '/help',
        name: 'Help',
        component: () => import('../views/Help'),
        meta: {
            layout: 'main',
            auth: true,
        },
    },
    {
        path: '/auth',
        name: 'Auth',
        component: () => import('../views/Auth.vue'),
        meta: {
            layout: 'auth',
            auth: false,
        },
    },
    {
        path: '/request/:id',
        name: 'Request',
        component: () => import('../views/Request.vue'),
        meta: {
            layout: 'main',
            auth: true,
        },
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    linkActiveClass: 'active',
    linkExactActiveClass: 'active',
})

router.beforeEach((to, from, next) => {
    const requiredAuth = to.meta.auth
    if (requiredAuth && store.getters['auth/isAuth']) {
        next()
    } else if (requiredAuth && !store.getters['auth/isAuth']) {
        next('/auth?message=auth')
    } else {
        next()
    }
})

export default router

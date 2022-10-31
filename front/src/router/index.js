import { createWebHistory, createRouter } from "vue-router"
import { nextTick } from "vue"

import Home from '@/views/index.vue'
import Login from '@/views/login.vue'
import Register from '@/views/register.vue'
import Glossaire from '@/views/glossaire.vue'
import ForgotPassword from '@/views/forgot-password.vue'
import Dashboard from '@/views/user/dashboard.vue'
import Admin from '@/views/user/admin.vue'
import Rooms from '@/views/rooms/index.vue'
import NotFound from '@/views/404.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/glossaire',
        name: 'Glossaire',
        component: Glossaire
    },
    {
        path: '/forgot-password',
        name: 'ForgotPassword',
        component: ForgotPassword
    },
    {
        path: '/user/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        requiresAuth: true
    },
    {
        path: '/user/admin',
        name: 'Admin',
        component: Admin,
        requiresAuth: true
    },
    {
        path: '/rooms',
        name: 'Rooms',
        component: Rooms,
        requiresAuth: true
    },
    {
        path: '/:pathMatch(.*)*',
        name: '404',
        component: NotFound
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.afterEach((to, from) => {
    nextTick(() => {
        document.title = `${to.name !== undefined ? to.name + ' - ' : ''}Fiches&Chips`
    })
})

export default router

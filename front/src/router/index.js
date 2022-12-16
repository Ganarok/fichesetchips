import { createWebHistory, createRouter } from "vue-router"
import { nextTick } from "vue"

import Home from '@/views/index.vue'
import About from "@/views/about.vue"
import Login from '@/views/login.vue'
import Register from '@/views/register.vue'
import Glossaire from '@/views/glossaire.vue'
import ForgotPassword from '@/views/forgot-password.vue'
import Dashboard from '@/views/user/dashboard.vue'
import Admin from '@/views/user/admin.vue'
import Rooms from '@/views/rooms/index.vue'
import RoomID from '@/views/rooms/[id]/index.vue'
import Session from '@/views/rooms/[id]/session.vue'
import Profile from '@/views/user/profile.vue'
import ProfileID from '@/views/user/profileID.vue'
import Create_Room from '@/views/rooms/create.vue'
import NotFound from '@/views/404.vue'
import CharacterCreate from '@/views/character/create.vue'
import TilemapEditor from "@/views/phaser/tilemap-editor.vue"

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        component: About
    },
    {
        path: '/glossaire',
        name: 'Glossaire',
        component: Glossaire
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
        path: '/user/profile',
        name: 'Profile',
        component: Profile,
        requiresAuth: true
    },
    {
        path: '/user/profile/:id',
        name: 'ProfileID',
        component: ProfileID,
        requiresAuth: true
    },
    {
        path: '/rooms',
        name: 'Rooms',
        component: Rooms,
        requiresAuth: true
    },
    {
        path: '/rooms/create',
        name: 'Create_Room',
        component: Create_Room,
        requiresAuth: true
    },
    {
        path: '/rooms/:id',
        name: 'RoomsID',
        component: RoomID,
        requiresAuth: true
    },
    {
        path: '/rooms/:id/session',
        name: 'Session',
        component: Session,
        requiresAuth: true
    },
    {
        path: '/:pathMatch(.*)*',
        name: '404',
        component: NotFound
    },
    {
        path: '/character/create',
        name: 'CharacterCreate',
        component: CharacterCreate,
        requiresAuth: true
    },
    {
        path: "/tilemap/editor",
        name: "TilemapEditr",
        component: TilemapEditor,
    }
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
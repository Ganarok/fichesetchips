import { createWebHistory, createRouter } from "vue-router"
import { nextTick } from "vue"
import { useToast } from "vue-toastification"

import store from "@/store"
import Home from "@/views/index.vue"
import About from "@/views/about.vue"
import Login from "@/views/login.vue"
import Register from "@/views/register.vue"
import Glossaire from "@/views/glossaire.vue"
import ForgotPassword from "@/views/forgot-password.vue"
import Dashboard from "@/views/user/dashboard.vue"
import Admin from "@/views/user/admin.vue"
import Rooms from "@/views/rooms/index.vue"
import RoomID from "@/views/rooms/[id]/index.vue"
import Session from "@/views/rooms/[id]/session.vue"
import Profile from "@/views/user/profile.vue"
import ProfileID from "@/views/user/profileID.vue"
import Maps from "@/views/user/maps.vue"
import Create_Room from "@/views/rooms/create.vue"
import NotFound from "@/views/404.vue"
import CharacterCreate from "@/views/character/create.vue"
import Characters from "@/views/character/index.vue"
import CharacterID from "@/views/character/characterDetails.vue"
import MapMaker from "@/views/phaser/mapmaker.vue"
import Stories from "@/views/stories/index.vue"
import Story from "@/views/stories/StoryDetails.vue"
import StoryCreate from "@/views/stories/create.vue"

const routes = [{
    path: "/",
    name: "Accueil",
    component: Home,
},
{
    path: "/about",
    name: "À propos",
    component: About,
},
{
    path: "/glossaire",
    name: "Glossaire",
    component: Glossaire,
},
{
    path: "/login",
    name: "Connexion",
    component: Login,
},
{
    path: "/register",
    name: "Inscription",
    component: Register,
},
{
    path: "/forgot-password",
    name: "Mot de passe oublié",
    component: ForgotPassword,
},
{
    path: "/user/dashboard",
    name: "Tableau de bord",
    component: Dashboard,
    meta: { requiresAuth: true }
},
{
    path: "/user/admin",
    name: "Admin",
    component: Admin,
    meta: { requiresAuth: true }
},
{
    path: "/user/profile",
    name: "Profil",
    component: Profile,
    meta: { requiresAuth: true }
},
{
    path: "/user/profile/:username",
    name: "ProfileID",
    component: ProfileID,
    meta: { requiresAuth: true }
},
{
    path: "/user/maps/",
    name: "Maps",
    component: Maps,
    meta: { requiresAuth: true }
},
{
    path: '/user/character/:id',
    name: 'CharacterID',
    component: CharacterID,
    meta: { requiresAuth: true }
},
{
    path: "/rooms",
    name: "Rooms",
    component: Rooms,
    meta: { requiresAuth: true }
},
{
    path: "/rooms/create",
    name: "Create_Room",
    component: Create_Room,
    meta: { requiresAuth: true }
},
{
    path: "/rooms/:id",
    name: "RoomsID",
    component: RoomID,
    meta: { requiresAuth: true }
},
{
    path: "/rooms/:id/session",
    name: "Session",
    component: Session,
    meta: { requiresAuth: true }
},
{
    path: "/:pathMatch(.*)*",
    name: "404",
    component: NotFound,
},
{
    path: "/characters/create",
    name: "CharacterCreate",
    component: CharacterCreate,
    requiresAuth: true,
    meta: { requiresAuth: true }
},
{
    path: "/characters",
    name: "Personnages",
    component: Characters,
    meta: { requiresAuth: true }
},
{
    path: "/mapmaker",
    name: "MapMaker",
    component: MapMaker,
    meta: { requiresAuth: true }
},
{
    path: "/user/stories",
    name: "Stories",
    component: Stories,
    meta: { requiresAuth: true }
},
{
    path: "/user/stories/:id",
    name: "Story",
    component: Story,
    meta: { requiresAuth: true }
},
{
    path: "/user/stories/create",
    name: "StoryCreate",
    component: StoryCreate,
    meta: { requiresAuth: true }
},
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if(to.matched.some((record) => record.meta.requiresAuth)) {
        // TODO: Faire une vérification de l'access_token avec la méthode connected() du module User
        if(!store.state.user.access_token) {
            const toast = useToast()
            console.log('Rerouting, user is not connected')
            next({
                path: "/login",
                params: { nextUrl: to.fullPath },
            })

            toast.error("Vous devez être connecté pour accéder à cette page")
        } else next()
    } else next()
})

router.afterEach((to) => {
    nextTick(() => {
        document.title = `${
            to.name !== undefined ? to.name + " - " : ""
        }Fiches&Chips`
    })
})

export default router
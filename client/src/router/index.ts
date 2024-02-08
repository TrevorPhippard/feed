import { createRouter, createWebHistory } from "vue-router";
import Auth from '../components/Auth.vue'
import Chat from '../components/Chat.vue'
import Register from '../components/Register.vue'
import Profile from '../components/Profile.vue'


const routes = [
    {
        path:'/profile',
        name:'/profile',
        component: Profile
    },{
        path:'/register',
        name:'/register',
        component: Register
    }, {
        path:'/',
        name:'/auth',
        component: Auth
    }
]

const router = createRouter({
    history: createWebHistory('/'),
    routes
})

export default router;
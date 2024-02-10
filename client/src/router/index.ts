import { createRouter, createWebHistory } from "vue-router";
import Auth from '../views/Auth.vue'
import Register from '../views/Register.vue'
import Profile from '../views/Profile.vue'
import TriviaEditor from '../views/TriviaEditor.vue'


const routes = [
    {
        path:'/profile',
        name:'/profile',
        component: Profile
    }, {
        path:'/editor',
        name:'/editor',
        component: TriviaEditor
    },{
        path:'/register',
        name:'/register',
        component: Register
    },{
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
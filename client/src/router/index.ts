import { createRouter, createWebHashHistory } from "vue-router";
import Auth from "../views/SignIn.vue"
import Register from "../views/SignUp.vue"
import Profile from "../views/Profile.vue"
import Editor from "../views/Editor.vue"
import Game from "../views/Game.vue"


const routes = [
    {
        path: "/game:id",
        name: "/game",
        component: Game
    },
    {
        path: "/profile",
        name: "/profile",
        component: Profile
    }, {
        path: "/editor",
        name: "/editor",
        component: Editor
    }, {
        path: "/signup",
        name: "/signup",
        component: Register
    }, {
        path: "/",
        name: '/signin',
        component: Auth
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
  });

export default router;
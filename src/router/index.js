import Vue from 'vue'
import VueRouter from 'vue-router'

// ? Auth
import LoginPage from '@/views/Auth/Login';
import RegisterPage from '@/views/Auth/Register';

// ? Pages
import Home from '@/views/Page/Home'

Vue.use(VueRouter)

const routes = [
  {
    name: "Login",
    path: "/",
    component: LoginPage,
    meta: { title: "Login Page" }
  },
  {
    name: "Register",
    path: "/register",
    component: RegisterPage,
    meta: { title: "Register Page" }
  },
  {
    path: "/home",
    component: Home,
    children: [
      {
        name: "Home",
        path: "/",
        meta: { title: "Home Page" },
      },
      {
        name: "Profile",
        path: "/user/profile",
        meta: { title: "Profile Page" },
      },
      {
        name: "About",
        path: "/about",
        meta: { title: "About Page" },
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'

// ? Pages
import LoginPage from "@/views/Auth/Login";

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
    // component: RegisterPage,
    meta: { title: "Register Page" }
  },
  {
    name: "Home",
    path: "/home",
    // component: Home,
    meta: { title: "Home Page" }
  }
]

const router = new VueRouter({
  routes
})

export default router

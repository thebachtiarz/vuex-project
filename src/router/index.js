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
    name: "Home",
    path: "/home"
  }
]

const router = new VueRouter({
  routes
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'

// ? Auth
import LoginPage from '@/views/Auth/Login';
import ForgetPasswordPage from '@/views/Auth/ForgetPassword';
import RecoverPasswordPage from '@/views/Auth/RecoverPassword';
import RegisterPage from '@/views/Auth/Register';
import RegisterVerifyPage from '@/views/Auth/RegisterVerify';

// ? Pages
import HomePage from '@/views/Page/Home';
import ProfilePage from '@/views/Page/User/Profile';

Vue.use(VueRouter)

const routes = [
  {
    name: "Login",
    path: "/",
    component: LoginPage,
    meta: { title: "Login Page" }
  },
  {
    name: "ForgetPassword",
    path: "/lost-password",
    component: ForgetPasswordPage,
    meta: { title: "Lost Password" }
  },
  {
    name: "RecoverPassword",
    path: "/lost-password/recover/:access",
    component: RecoverPasswordPage,
    meta: { title: "Recover Password" }
  },
  {
    name: "Register",
    path: "/register",
    component: RegisterPage,
    meta: { title: "Register Page" }
  },
  {
    name: "RegisterVerify",
    path: "/register/verify/:access",
    component: RegisterVerifyPage,
    meta: { title: "Verifiying Email" }
  },
  {
    path: "/home",
    component: HomePage,
    children: [
      {
        name: "Home",
        path: "/",
        meta: { title: "Home Page" },
      },
      {
        name: "Profile",
        path: "/user/profile",
        component: ProfilePage,
        meta: { title: "Profile Page" },
      }
    ]
  },
  {
    name: "About",
    path: "/about",
    // component: AboutPage,
    meta: { title: "About Us" }
  },
  {
    name: "PageNotFound",
    path: "*",
    // component: PageNotFoundPage,
    meta: { title: "Page Not Found" }
  }
]

const router = new VueRouter({
  // mode: 'history',
  routes
})

export default router

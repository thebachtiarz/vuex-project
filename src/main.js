import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import JQuery from 'jquery'
import VueMeta from "vue-meta";
import Cookies from "js-cookie";

// ? Libraries
import RestServices from '@/services/axios/rest-api'

// ? Helpers
import CredMng from '@/third-party/auth/credential-manager.min.js'
import AppHelper from '@/third-party/helper/app-helper.min.js'
import AuthMid from '@/third-party/auth/auth-middleware.js'

// ? Admin LTE
import "admin-lte/plugins/fontawesome-free/css/all.min.css";
import "admin-lte/plugins/icheck-bootstrap/icheck-bootstrap.min.css";
import "admin-lte/dist/css/adminlte.min.css";
import "admin-lte/plugins/overlayScrollbars/css/OverlayScrollbars.min.css";
import "toastr/build/toastr.min.css";
import "admin-lte/plugins/jquery/jquery.min.js";
import "admin-lte/plugins/bootstrap/js/bootstrap.bundle.min.js";
import "admin-lte/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js";


// ! Usage
Vue.prototype.$axios = RestServices;
Vue.prototype.$cookies = Cookies;
Vue.prototype.$ = JQuery;
Vue.prototype.$CredMng = CredMng;
Vue.prototype.$AppHelper = AppHelper;
Vue.prototype.$AuthMid = AuthMid;

Vue.config.productionTip = false

Vue.use(VueMeta, {
  refreshOnceOnNavigation: true
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

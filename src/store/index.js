import Vue from 'vue'
import Vuex from 'vuex'

import AuthRes from './Auth/auth-rest'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    AuthRes
  }
})

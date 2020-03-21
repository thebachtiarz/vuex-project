<template>
  <div class="login-box">
    <div class="login-logo text-white">{{this.$AppHelper.appName()}}</div>
    <div class="card">
      <div class="card-body login-card-body">
        <p class="login-box-msg" id="view-login-msg">Create new Member</p>
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control theInput"
            id="input-name"
            placeholder="Full Name"
            v-model="thisName"
          />
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-user-alt"></span>
            </div>
          </div>
        </div>
        <div class="input-group mb-3">
          <input
            type="email"
            class="form-control theInput"
            id="input-email"
            placeholder="E-Mail"
            v-model="thisEmail"
          />
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-at"></span>
            </div>
          </div>
        </div>
        <div class="input-group mb-3">
          <input
            type="password"
            class="form-control theInput"
            id="input-password"
            placeholder="Password"
            v-model="thisPassword"
          />
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-lock"></span>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col offset-7 col-5">
            <button type="submit" class="btn btn-primary btn-block text-bold" id="input-submit">
              <i class="fas fa-user-plus"></i>&ensp;Register
            </button>
          </div>
        </div>
        <p class="mb-0">
          <router-link :to="{ name: 'Login' }" class="text-center">
            <i class="fas fa-sign-in-alt"></i>&ensp;Login
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      thisName: "",
      thisEmail: "",
      thisPassword: ""
    };
  }
};
</script>

<style>
</style>
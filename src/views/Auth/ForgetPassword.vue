<template>
  <div class="login-box">
    <div class="login-logo text-white">{{this.$AppHelper.appName()}}</div>
    <div class="card">
      <div class="card-body login-card-body">
        <p
          class="login-box-msg"
        >You forgot your password? Here you can easily retrieve a new password.</p>
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
        <div class="row mb-3">
          <div class="col-12">
            <button type="submit" class="btn btn-primary btn-block text-bold" id="input-submit">
              <i class="fas fa-paper-plane"></i>&ensp;Request new password
            </button>
          </div>
        </div>
        <p class="mb-1">
          <router-link :to="{ name: 'ForgetPassword' }" class="text-center">
            <i class="fas fa-sign-in-alt"></i>&ensp;Login
          </router-link>
        </p>
        <p class="mb-0">
          <router-link :to="{ name: 'Register' }" class="text-center">
            <i class="fas fa-user-plus"></i>&ensp;Register a new membership
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ForgetPassword",
  data() {
    return {
      thisEmail: ""
    };
  }
};
</script>
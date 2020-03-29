<template>
  <div class="login-box">
    <div class="login-logo text-white">{{this.$AppHelper.appName()}}</div>
    <div class="card">
      <div class="card-body login-card-body">
        <p
          class="login-box-msg"
        >You are only one step a way from your new password, recover your password now.</p>
        <div class="input-group mb-3">
          <input
            type="password"
            class="form-control"
            id="input-password"
            placeholder="Password"
            @keyup.enter="gotoRepassword"
          />
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-lock"></span>
            </div>
          </div>
        </div>
        <div class="input-group mb-3">
          <input
            type="password"
            class="form-control"
            id="input-repassword"
            placeholder="Confirm Password"
            @keyup.enter="gotoSubmit"
          />
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-lock"></span>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <button type="submit" class="btn btn-primary btn-block text-bold" id="input-submit">
              <i class="fas fa-key"></i>&ensp;Change password
            </button>
          </div>
        </div>
        <p class="mt-3 mb-1">
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
  name: "RecoverPassword",
  methods: {
    gotoRepassword() {
      this.$("#input-repassword").focus();
    },
    gotoSubmit() {
      this.$("#input-submit").click();
    }
  }
};
</script>
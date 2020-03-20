<template>
  <div class="login-box">
    <div class="login-logo text-white">
      <b>Online Exam</b>&ensp;Apps
    </div>
    <div class="card">
      <div class="card-body login-card-body">
        <p class="login-box-msg" id="view-login-msg">Sign in to start your session</p>
        <div class="input-group mb-3">
          <input
            type="email"
            class="form-control theInput"
            id="input-email"
            placeholder="E-mail"
          />
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-user"></span>
            </div>
          </div>
        </div>
        <div class="input-group mb-3">
          <input
            type="password"
            class="form-control theInput"
            id="input-password"
            placeholder="Password"
          />
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-lock"></span>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col offset-7 col-5">
            <button
              type="submit"
              class="btn btn-primary btn-block text-bold"
              id="input-submit"
            >
              <i class="fas fa-sign-in-alt"></i>&ensp;Masuk
            </button>
          </div>
        </div>
        <p class="mb-0">
          <router-link :to="{ name: 'Login' }" class="text-center">
            <i class="fas fa-user-plus"></i>&ensp;Daftar
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>
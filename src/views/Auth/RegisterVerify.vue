<template>
  <div class="login-box">
    <div class="login-logo text-white">{{this.$AppHelper.appName()}}</div>
    <div class="card">
      <div class="card-body login-card-body">
        <p class="login-box-msg">Please wait, we'll verify your account.</p>
        <p class id="process-message"></p>
      </div>
    </div>
  </div>
</template>

<script>
import AwSleep from "@/third-party/helper/await-sleep.min.js";
export default {
  name: "RegisterVerify",
  created() {
    this.processAccess();
  },
  methods: {
    async processAccess() {
      this.$Progress.start();
      await AwSleep.sleep(500);
      if (this.tokenAccess.length != 32) {
        this.$Progress.fail();
        await AwSleep.redirectTo("Login");
      }
      this.responseMessage("#process-message", `info`, `Processing`);
      await AwSleep.sleep(2000);
      this.verifyAccess();
    },
    verifyAccess() {
      this.$axios.getCookies().then(() => {
        this.$axios
          .postVerifyRegister(this.tokenAccess)
          .then(async res => {
            res.data.status == "success"
              ? this.$Progress.finish()
              : this.$Progress.fail();
            this.responseMessage(
              "#process-message",
              `${res.data.status}`,
              `${res.data.message}`
            );
            await AwSleep.sleep(2000);
            this.responseMessage("#process-message", `info`, `Redirect`);
            await AwSleep.redirectTo("Login");
          })
          .catch(async err => {
            this.$Progress.fail();
            let error = err.toJSON();
            this.responseMessage(
              "#process-message",
              `error`,
              `${error.message}`
            );
            await AwSleep.sleep(2000);
            this.responseMessage("#process-message", `info`, `Redirect`);
            await AwSleep.redirectTo("Login");
          });
      });
    },
    responseMessage(goto, status, message) {
      this.$(goto).removeClass();
      this.$(goto).html("");
      const stat = {
        success: {
          color: "success",
          icon: `<i class="far fa-check-circle"></i>`
        },
        error: {
          color: "danger",
          icon: `<i class="far fa-times-circle"></i>`
        },
        info: {
          color: "info",
          icon: `<i class="fas fa-spinner fa-pulse"></i>`
        }
      };
      this.$(goto).addClass(`text-bold text-center text-${stat[status].color}`);
      this.$(goto).html(`${message} ${stat[status].icon}`);
    }
  },
  data() {
    return {
      tokenAccess: this.$route.params.access
    };
  }
};
</script>
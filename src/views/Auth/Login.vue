<template>
  <div class="login-box">
    <div class="login-logo text-white">{{this.$AppHelper.appName()}}</div>
    <div class="card">
      <div class="card-body login-card-body">
        <p class="login-box-msg" id="view-login-msg">Sign in to start your session</p>
        <div class="input-group mb-3">
          <input
            type="email"
            class="form-control theInput"
            id="input-email"
            placeholder="E-Mail"
            @keyup.enter="gotoPassword"
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
            @keyup.enter="gotoSubmit"
            v-model="thisPassword"
          />
          <div class="input-group-append">
            <div class="input-group-text" @click="passwordWatch">
              <span class="fas fa-eye" id="span-password"></span>
            </div>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-7">
            <div class="icheck-primary">
              <input type="checkbox" id="remember" v-model="thisRemember" />
              <label for="remember">Remember Me</label>
            </div>
          </div>
          <div class="col-5">
            <button
              type="submit"
              class="btn btn-primary btn-block text-bold"
              id="input-submit"
              @click="getCredentials"
            >
              <i class="fas fa-sign-in-alt"></i>&ensp;Login
            </button>
          </div>
        </div>
        <p class="mb-1">
          <router-link :to="{ name: 'ForgetPassword' }" class="text-center">
            <i class="fas fa-user-injured"></i>&ensp;I forgot my password
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
import ForgeJs from "@/third-party/library/forgejs.min.js";
import AwSleep from "@/third-party/helper/await-sleep.min.js";
export default {
  name: "Login",
  created() {
    if (this.$CredMng.credentialKeyTake()) {
      this.autoLogin();
    }
  },
  methods: {
    async getCredentials() {
      this.inputClear();
      if (this.thisEmail && this.thisPassword) {
        this.$("#input-submit").prop("disabled", true);
        this.$("#view-login-msg").html(
          this.spanMessage(
            "success",
            `Login... <i class="fas fa-spinner fa-pulse"></i>`
          )
        );
        this.$Progress.start();
        await this.postLogin(
          this.thisEmail,
          ForgeJs.encryptPassword(this.thisPassword)
        );
      }
      if (!this.thisEmail) {
        this.$("#input-email").attr("placeholder", "E-Mail can't be empty");
        this.inputInValid("#input-email");
      }
      if (!this.thisPassword) {
        this.$("#input-password").attr(
          "placeholder",
          "Password can't be empty"
        );
        this.inputInValid("#input-password");
      }
    },
    postLogin(email, password) {
      this.$axios
        .getCookies()
        .then(() => {
          this.$axios
            .postLogin(email, password)
            .then(response => this.loginResponse(response.data))
            .catch(error => this.catchError(error));
        })
        .catch(error => this.catchError(error));
    },
    async autoLogin() {
      await AwSleep.sleep(1000);
      this.$("#input-submit").prop("disabled", true);
      this.$("#view-login-msg").html(
        this.spanMessage(
          "success",
          `Auto Login... <i class="fas fa-spinner fa-pulse"></i>`
        )
      );
      this.$Progress.start();
      await AwSleep.sleep(2000);
      await this.$axios
        .getCookies()
        .then(async () => {
          await this.$axios
            .getCredential()
            .then(async response => {
              this.$("#view-login-msg").html(
                this.spanMessage(
                  "success",
                  `Welcome Back ${response.data.response_data.name}`
                )
              );
              await AwSleep.sleep(2000);
              this.$("#view-login-msg").html(
                this.spanMessage(
                  "success",
                  `Please waitt... <i class="fas fa-spinner fa-pulse"></i>`
                )
              );
              await AwSleep.sleep(3000);
              this.$Progress.finish();
              return this.$router.push({ name: "Home" });
            })
            .catch(
              error => (
                this.$CredMng.credentialKeyRemove(), this.catchError(error)
              )
            );
        })
        .catch(error => this.catchError(error));
    },
    async loginResponse(data) {
      await AwSleep.sleep(1000);
      if (data.status == "success") {
        this.$CredMng.credentialKeySave(
          data.response_data.access_token,
          this.thisRemember
        ),
          this.$("#view-login-msg").html(
            this.spanMessage(
              "success",
              `Welcome ${data.response_data.account_name}`
            )
          );
        await AwSleep.sleep(1000);
        this.$("#view-login-msg").html(
          this.spanMessage(
            "success",
            `Please waitt... <i class="fas fa-spinner fa-pulse"></i>`
          )
        );
        await AwSleep.sleep(3000);
        this.$Progress.finish();
        return this.$router.push({ name: "Home" });
      } else {
        this.$Progress.fail();
        let error = "";
        data.message.email
          ? data.message.email.forEach(
              msgid => (error += this.spanMessage("info", msgid))
            )
          : (error += this.spanMessage("info", data.message));
        this.$("#view-login-msg").html(error);
        this.$("#input-submit").prop("disabled", false);
      }
    },
    passwordWatch() {
      let inputtype = this.$("#input-password").attr("type");
      this.$("#span-password").removeClass();
      if (inputtype == "password") {
        this.$("#input-password").attr("type", "text");
        this.$("#span-password").addClass("fas fa-eye-slash");
      } else {
        this.$("#input-password").attr("type", "password");
        this.$("#span-password").addClass("fas fa-eye");
      }
    },
    spanMessage(color, message) {
      return `<p class="text-bold text-${color}">${message}</p>`;
    },
    gotoPassword() {
      this.$("#input-password").focus();
    },
    gotoSubmit() {
      this.$("#input-submit").click();
    },
    inputInValid(goto) {
      this.$(goto).addClass("is-invalid");
      this.$(goto).addClass("text-danger");
    },
    inputValid(goto) {
      this.$(goto).addClass("is-valid");
      this.$(goto).addClass("text-success");
    },
    inputClear() {
      this.$(".theInput").removeClass("is-valid");
      this.$(".theInput").removeClass("is-invalid");
      this.$(".theInput").removeClass("text-success");
      this.$(".theInput").removeClass("text-danger");
    },
    catchError(error) {
      this.$Progress.fail();
      this.$("#view-login-msg").html(
        this.spanMessage("danger", "Opps!, something went wrong")
      );
      this.$("#input-submit").prop("disabled", false);
      console.log(error);
    }
  },
  data() {
    return {
      thisEmail: "",
      thisPassword: "",
      thisRemember: false
    };
  }
};
</script>

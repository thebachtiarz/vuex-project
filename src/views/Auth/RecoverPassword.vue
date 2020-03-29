<template>
  <div class="login-box">
    <div class="login-logo text-white">{{this.$AppHelper.appName()}}</div>
    <div class="card">
      <div class="card-body login-card-body">
        <p
          class="login-box-msg"
        >You are only one step a way from your new password, recover your password now.</p>
        <div class="input-group">
          <input
            type="password"
            class="form-control"
            id="input-password"
            placeholder="New Password"
            @keyup="formFieldPassword"
            @keyup.enter="gotoSubmit"
            v-model="thisPassword"
          />
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-lock" id="thepassword" v-on:click="passwordWatch('true')"></span>
            </div>
          </div>
        </div>
        <p class="messagePassword mt-1"></p>
        <p
          class="text-muted font-italic"
          id="password-generate-button"
          style="font-size: 15px; display: none"
        >
          Confuse?, just
          <a href="javascript:void(0)" @click="generatePassword">
            <u>generate password</u>
          </a>
        </p>
        <div class="row">
          <div class="col-12">
            <button
              type="submit"
              class="btn btn-primary btn-block text-bold"
              id="input-submit"
              @click="postSubmitRecover"
            >
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
import PassGen from "generate-password";
import Swal from "sweetalert2";
import AwSleep from "@/third-party/helper/await-sleep.min.js";
import ForgeJs from "@/third-party/library/forgejs.min.js";
import Toastr from "@/third-party/library/toastrjs.min.js";
export default {
  name: "RecoverPassword",
  created() {
    this.checkAccess();
  },
  methods: {
    checkAccess() {
      this.$axios.get(`/sanctum/csrf-cookie`).then(() => {
        this.$axios
          .post(`/api/auth/lost-password/access`, { _access: this.tokenAccess })
          .then(res => {
            if (res.data.status == "error") {
              Toastr.toastError(res.data.message);
              AwSleep.redirectTo("Login", 0);
            }
          })
          .catch(err => {
            let error = err.toJSON();
            Toastr.toastError(error.message);
            AwSleep.redirectTo("Login", 0);
          });
      });
    },
    postSubmitRecover() {
      Swal.fire({
        title: "Are you sure?",
        text: "Password will be updated to a new password",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancel!",
        confirmButtonText: "Yes, Im sure!"
      }).then(async result => {
        if (result.value) {
          if (this.boolPassword) {
            this.$("#input-submit").prop("disabled", true);
            await this.postNewPassword();
            this.$("#input-submit").prop("disabled", false);
          } else {
            Swal.fire(
              "Waitt!",
              "Your new password aren't correct yet.",
              "warning"
            );
          }
        }
      });
    },
    postNewPassword() {
      this.$axios.get(`/sanctum/csrf-cookie`).then(() => {
        this.$axios
          .post(`/api/auth/lost-password/recover`, {
            password: ForgeJs.encryptPassword(this.thisPassword),
            _access: this.tokenAccess
          })
          .then(async res => {
            await Swal.fire(
              `${res.data.status == "success" ? "Success!" : "Failed!"}`,
              `${res.data.message}`,
              `${res.data.status == "success" ? "success" : "error"}`
            );
            return this.$router.push({ name: "Login" });
          })
          .catch(err => {
            let error = err.toJSON();
            Swal.fire(`Failed!`, `${error.message}`, "error");
          });
      });
    },
    async formFieldPassword() {
      let regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
      await AwSleep.sleep(500);
      this.$("#password-generate-button").show();
      this.passwordWatch();
      if (this.thisPassword.length > 0) {
        if (regex.test(this.thisPassword)) {
          this.boolPassword = true;
          this.setFieldMessage(
            ".messagePassword",
            "success",
            "You have strong and correct password"
          );
        } else {
          this.boolPassword = false;
          this.setFieldMessage(
            ".messagePassword",
            "error",
            "Password must be between 8 to 15 characters which containing at least one lowercase letter, one uppercase letter, one numeric number, and one special character"
          );
        }
      } else {
        this.boolPassword = false;
        this.setFieldMessage(
          ".messagePassword",
          "error",
          "Password cannot be empty"
        );
        this.$("#thepassword").removeClass();
        this.$("#thepassword").addClass("fas fa-lock");
      }
    },
    passwordWatch(action = "") {
      if (this.thisPassword.length > 0) {
        this.$("#thepassword").removeClass();
        if (this.seePassword) {
          if (action) {
            this.seePassword = false;
            this.$("#input-password").attr("type", "password");
            this.$("#thepassword").addClass("fas fa-eye");
          } else {
            this.$("#thepassword").addClass("fas fa-eye-slash");
          }
        } else {
          if (action) {
            this.seePassword = true;
            this.$("#input-password").attr("type", "text");
            this.$("#thepassword").addClass("fas fa-eye-slash");
          } else {
            this.$("#thepassword").addClass("fas fa-eye");
          }
        }
      }
    },
    generatePassword() {
      let password = PassGen.generate({
        length: 10,
        numbers: true,
        symbols: true,
        excludeSimilarCharacters: true
      });
      this.thisPassword = password;
      this.seePassword = true;
      this.$("#thepassword").removeClass();
      this.$("#input-password").attr("type", "text");
      this.$("#thepassword").addClass("fas fa-eye-slash");
    },
    setFieldMessage(goto, status, message) {
      this.$(`${goto}`).css(
        "color",
        `${status == "success" ? "#119822" : "#C91E1E"}`
      );
      this.$(`${goto}`).html(message);
    },
    gotoSubmit() {
      this.$("#input-submit").click();
    }
  },
  watch: {
    thisPassword() {
      this.formFieldPassword();
    }
  },
  data() {
    return {
      tokenAccess: this.$route.params.access,
      thisPassword: "",
      boolPassword: false
    };
  }
};
</script>
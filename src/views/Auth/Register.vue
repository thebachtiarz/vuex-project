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
            @keyup.enter="gotoEmail"
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
              @click="postRegister"
            >
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
import Swal from "sweetalert2";
import ForgeJS from "@/third-party/library/forgejs.min.js";
export default {
  name: "Register",
  methods: {
    postRegister() {
      Swal.fire({
        title: "Are you sure credential is correct?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancel!",
        confirmButtonText: "Yes, im sure!"
      }).then(async result => {
        if (result.value) {
          if (this.thisPassword.length > 5) {
            this.$("#input-submit").prop("disabled", true);
            await this.postNewMember();
            this.$("#input-submit").prop("disabled", false);
          } else {
            Swal.fire(
              "Waitt!",
              "Password must be more than 5 characters.",
              "warning"
            );
          }
        }
      });
    },
    async postNewMember() {
      this.$axios
        .get(`/airlock/csrf-cookie`, {
          headers: { "X-Requested-With": "XMLHttpRequest" },
          withCredentials: true
        })
        .then(() => {
          this.$axios
            .post(`/api/auth/register`, {
              name: this.thisName,
              email: this.thisEmail,
              password: ForgeJS.encryptPassword(this.thisPassword)
            })
            .then(async res => await this.responseRegister(res.data))
            .catch(err => this.catchError(err));
        })
        .catch(err => this.catchError(err));
    },
    gotoEmail() {
      this.$("#input-email").focus();
    },
    gotoPassword() {
      this.$("#input-password").focus();
    },
    gotoSubmit() {
      this.$("#input-submit").click();
    },
    catchError(error) {
      let err = error.toJSON();
      this.$("#view-login-msg").html(this.spanMessage("danger", err.message));
      this.$("#input-submit").prop("disabled", false);
    },
    async responseRegister(data) {
      if (data.status == "success") {
        await Swal.fire("Success", `${data.message}`, "success");
        return this.$router.push({ name: "Login" });
      } else {
        await Swal.fire(
          "Failed",
          `${this.responseRegisterFailed(data.message)}`,
          "error"
        );
      }
    },
    responseRegisterFailed(data) {
      let errorMsg = "";
      if (data.name) {
        data.name.forEach(msg => {
          errorMsg += errorMsg ? `, ${msg}` : msg;
        });
      }
      if (data.email) {
        data.email.forEach(msg => {
          errorMsg += errorMsg ? `, ${msg}` : msg;
        });
      }
      return errorMsg;
    }
  },
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
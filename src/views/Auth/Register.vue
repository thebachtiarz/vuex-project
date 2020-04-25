<template>
  <div class="login-box">
    <div class="login-logo text-white">{{this.$AppHelper.appName()}}</div>
    <div class="card">
      <div class="card-body login-card-body">
        <p class="login-box-msg" id="view-login-msg">Create new Member</p>
        <div class="input-group">
          <input
            type="text"
            class="form-control theInput"
            id="input-name"
            placeholder="Full Name"
            @keyup="formFieldName"
            @keyup.enter="gotoEmail"
            v-model="thisName"
          />
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-user-alt"></span>
            </div>
          </div>
        </div>
        <p class="messageName mt-1"></p>
        <div class="input-group">
          <input
            type="email"
            class="form-control theInput"
            id="input-email"
            placeholder="E-Mail"
            @keyup="formFieldEmail"
            @keyup.enter="gotoPassword"
            v-model="thisEmail"
          />
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-at"></span>
            </div>
          </div>
        </div>
        <p class="messageEmail mt-1"></p>
        <div class="input-group">
          <input
            type="password"
            class="form-control theInput"
            id="input-password"
            placeholder="Password"
            @keyup="formFieldPassword"
            @keyup.enter="gotoSubmit"
            v-model="thisPassword"
          />
          <div class="input-group-append">
            <div class="input-group-text" v-on:click="passwordWatch('true')">
              <span class="fas fa-lock" id="thepassword"></span>
            </div>
          </div>
        </div>
        <div class="messagePassword mt-1" :v-if="msgPassword.length">
          <h6 v-for="(msg, idx) in msgPassword" :key="idx">{{msg}}</h6>
        </div>
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
        <div class="row mt-3 mb-3">
          <div class="col offset-6 offset-md-7 col-6 col-md-5">
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
            <i class="fas fa-sign-in-alt"></i>&ensp;I already have a membership
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import PassGen from "generate-password";
import Swal from "sweetalert2";
import ForgeJS from "@/third-party/library/forgejs.min";
import AwSleep from "@/third-party/helper/await-sleep.min";
import RegexValidation from "@/third-party/helper/regex-validation.min";
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
        confirmButtonText: "Yes, Im sure!"
      }).then(async result => {
        if (result.value) {
          if (this.boolName && this.boolEmail && this.boolPassword) {
            this.$("#input-submit").prop("disabled", true);
            await this.postNewMember();
            this.$("#input-submit").prop("disabled", false);
          } else {
            Swal.fire(
              "Waitt!",
              "Your credentials aren't correct yet.",
              "warning"
            );
          }
        }
      });
    },
    async postNewMember() {
      this.$axios
        .getCookies()
        .then(() => {
          this.$axios
            .postRegister(
              this.thisName,
              this.thisEmail,
              ForgeJS.encryptPassword(this.thisPassword)
            )
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
    },
    setFieldMessage(goto, status, message) {
      this.$(`${goto}`).css(
        "color",
        `${status == "success" ? "#119822" : "#C91E1E"}`
      );
      this.$(`${goto}`).html(message);
    },
    clearFieldMessage(goto) {
      this.$(`${goto}`).html("");
    },
    async formFieldName() {
      await AwSleep.sleep(1000);
      let validate = RegexValidation.nameRegex(this.thisName);
      this.boolName = validate.result;
      this.setFieldMessage(".messageName", validate.status, validate.message);
    },
    async formFieldEmail() {
      await AwSleep.sleep(1000);
      let validate = RegexValidation.mailRegex(this.thisEmail);
      this.boolEmail = validate.result;
      this.setFieldMessage(".messageEmail", validate.status, validate.message);
    },
    async formFieldPassword() {
      await AwSleep.sleep(1000);
      let validate = RegexValidation.passRegex(this.thisPassword);
      this.$("#password-generate-button").show();
      this.passwordWatch();
      this.$(".messagePassword").css(
        "color",
        `${validate.status == "success" ? "#119822" : "#C91E1E"}`
      );
      this.boolPassword = validate.result;
      this.msgPassword = validate.message;
      if (this.thisPassword.length == 0) {
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
    }
  },
  watch: {
    thisPassword() {
      this.formFieldPassword();
    }
  },
  data() {
    return {
      thisName: "",
      thisEmail: "",
      thisPassword: "",
      boolName: false,
      boolEmail: false,
      boolPassword: false,
      seePassword: false,
      msgPassword: []
    };
  }
};
</script>

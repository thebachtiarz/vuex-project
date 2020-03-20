<template>
  <router-view />
</template>

<script>
export default {
  name: "App",
  metaInfo() {
    return {
      title: this.$route.meta.title,
      titleTemplate: `%s :: ${this.$AppHelper.appName()}`,
      htmlAttrs: {
        lang: "en",
        amp: true
      },
      bodyAttrs: {
        class:
          this.$route.name == "Login"
            ? "hold-transition login-page bg-gradient-dark"
            : "sidebar-mini layout-fixed layout-navbar-fixed"
      }
    };
  },
  created() {
    this.classBody();
  },
  methods: {
    classBody() {
      if (this.$route.name == "Login") {
        this.$("body").css("min-height", "511.6px");
        // if (this.$CredMng.credentialKeyTake()) {
        //   this.gotoHome();
        // }
      } else {
        this.$("body").removeAttr("style");
      }
    },
    gotoHome() {
      return this.$router.push({ name: "Home" });
    }
  },
  watch: {
    $route() {
      this.classBody();
    }
  }
};
</script>
<template>
  <router-view />
</template>

<script>
export default {
  name: "App",
  metaInfo: {
    title: this.$route.meta.title, // BOSOK
    htmlAttrs: {
      lang: "en",
      amp: true
    }
  },
  created() {
    this.classBody();
  },
  methods: {
    classBody() {
      if (this.$route.name == "Login") {
        this.$("body").addClass("hold-transition login-page bg-gradient-dark");
        this.$("body").css("min-height", "511.6px");
        // if (this.$CredMng.credentialKeyTake()) {
        //   this.gotoHome();
        // }
      } else {
        this.$("body").addClass(
          "sidebar-mini layout-fixed layout-navbar-fixed"
        );
      }
    },
    gotoHome() {
      return this.$router.push({ name: "Home" });
    }
  }
};
</script>
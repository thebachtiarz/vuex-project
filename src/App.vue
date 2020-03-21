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
        class: this.boolBodyClass()
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
      if (this.boolBodyClass()) {
        this.$("body").css("min-height", "511.6px");
      } else {
        this.$("body").removeAttr("style");
      }
    },
    boolBodyClass() {
      let routeName = this.$route.name;
      let arrNameRoute = ["Login", "Register"];
      let routeCheck = arr => arr.find(r => (r == routeName ? true : false));
      return routeCheck(arrNameRoute);
    }
  },
  watch: {
    $route() {
      this.classBody();
    }
  }
};
</script>
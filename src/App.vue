<template>
  <div>
    <router-view />
    <vue-progress-bar></vue-progress-bar>
  </div>
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
    this.$Progress.start();
    this.authCheckMiddleware();
    this.classBody();
  },
  mounted() {
    this.$Progress.finish();
  },
  methods: {
    authCheckMiddleware() {
      let arrNameRoute = this.$AuthMid.getRouteAuthProtected();
      let routeCheck = arr =>
        arr.find(r => (r == this.routeName ? true : false));
      if (routeCheck(arrNameRoute)) {
        this.$AuthMid.boolCheck();
      }
    },
    classBody() {
      if (this.boolBodyClass()) {
        this.$("body").css("min-height", "511.6px");
      } else {
        this.$("body").removeAttr("style");
      }
    },
    boolBodyClass() {
      let arrNameRoute = this.$AuthMid.getRouteUnprotected();
      let routeCheck = arr =>
        arr.find(r => (r == this.routeName ? true : false));
      return routeCheck(arrNameRoute);
    }
  },
  watch: {
    $route() {
      this.classBody();
      this.routeName = this.$route.name;
    }
  },
  data() {
    return {
      routeName: this.$route.name
    };
  }
};
</script>
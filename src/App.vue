<template>
  <div :class="this.boolBodyClass() ? `row` : ``">
    <vue-progress-bar />
    <router-view />
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
    this.$router.beforeEach((to, from, next) => {
      this.$Progress.start();
      if (to.name == "PageNotFound") this.$Progress.fail();
      next();
    });
    this.$router.afterEach(() => this.$Progress.finish());
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
      if (this.boolBodyClass()) this.$("body").css("min-height", "512.391px");
      else this.$("body").removeAttr("style");
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
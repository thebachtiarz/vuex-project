<template>
  <div class="home-page">
    <div class="wrapper">
      <Navbar />
      <Sidebar />
      <div class="content-wrapper">
        <ContentHeader :title="appTitle" />
        <div class="content">
          <div class="container-fluid">
            <router-view />
          </div>
        </div>
      </div>
      <Footer :app_name="this.$AppHelper.appName()" />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
// ? Framework Application
import Navbar from "@/components/App/Frame/Navbar";
import Sidebar from "@/components/App/Frame/Sidebar";
import ContentHeader from "@/components/App/Frame/ContentHeader";
import Footer from "@/components/App/Frame/Footer";
export default {
  name: "Home",
  components: {
    Navbar,
    Sidebar,
    ContentHeader,
    Footer
  },
  async created() {
    if (!this.$CredMng.credentialKeyTake()) {
      return await this.$router.push({ name: "Login" });
    } else {
      this.getBiodata();
    }
  },
  methods: {
    ...mapActions(["getBiodata"])
  },
  watch: {
    $route() {
      this.appTitle = this.$route.meta.title;
    }
  },
  data() {
    return {
      appTitle: this.$route.meta.title
    };
  }
};
</script>
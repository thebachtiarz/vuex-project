<template>
  <div class="user-panel mt-2 pb-2 mb-2" id="sidebarLink">
    <ul
      class="nav nav-pills nav-sidebar flex-column"
      data-widget="treeview"
      role="menu"
      data-accordion="false"
    >
      <li class="nav-item" v-for="{index, name, icon, link} in sidebarLink" :key="index">
        <router-link
          :to="{ name: link }"
          :class="`nav-link linkUrl ${(link == getPath()) ? `active` : ``}`"
          :id="`linkID-${index}`"
          @click.native="activeLi(index)"
        >
          <i :class="icon"></i>&ensp;
          <p class="text-sm">{{ name }}</p>
        </router-link>
      </li>
      <li class="nav-item">
        <a class="nav-link" id="app-signout" @click="appSignout">
          <i class="fas fa-sign-out-alt"></i>&ensp;
          <p class="text-sm">Sign Out</p>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Swal from "sweetalert2";
import AwSleep from "@/third-party/helper/await-sleep.min.js";
import Toastr from "@/third-party/library/toastrjs.min.js";
export default {
  name: "AllowLink",
  computed: {
    ...mapGetters(["sidebarLink"])
  },
  methods: {
    getPath() {
      return this.$route.name;
    },
    activeLi: function(index) {
      this.$(".linkUrl").removeClass("active");
      this.$(`#linkID-${index}`).addClass("active");
    },
    appSignout() {
      Swal.fire({
        title: "Are you sure ?",
        text: "We will miss you",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Sure!",
        cancelButtonText: "Cancel"
      }).then(async result => {
        if (result.value) {
          this.$CredMng.credentialKeyRemove();
          // remove too credential in database
          await Toastr.toastSuccess("Successfully Logout");
          await AwSleep.sleep(2000);
          return this.$router.push({ name: "Login" });
        }
      });
    }
  }
};
</script>
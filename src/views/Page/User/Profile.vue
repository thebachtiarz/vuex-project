<template>
  <div class="row">
    <div class="col-md-4">
      <div class="card card-primary card-outline">
        <div class="card-body box-profile">
          <div class="text-center">
            <img
              class="profile-user-img img-fluid img-circle"
              :src="`${this.$AppHelper.apiEndpoint()}${thisBiodata.profile_img}`"
              alt="user-profile-image"
            />
          </div>
          <h3 class="profile-username text-center">{{ thisBiodata.name }}</h3>
          <p class="text-muted text-bold text-center">{{ thisBiodata.status }}</p>
          <ul class="list-group list-group-unbordered mb-3">
            <li class="list-group-item">
              <i class="fas fa-at"></i>
              <a class="float-right">{{ thisBiodata.email }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="col-md-8">
      <div class="card">
        <div class="card-header p-2">
          <ul class="nav nav-pills">
            <li class="nav-item">
              <a class="nav-link text-bold active" href="#history" data-toggle="tab">History</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-bold" href="#biodata" data-toggle="tab">Biodata</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-bold" href="#password" data-toggle="tab">Password</a>
            </li>
          </ul>
        </div>
        <div class="card-body">
          <div class="tab-content">
            <div class="tab-pane active" id="history">Login History.</div>
            <div class="tab-pane" id="biodata">
              <p class="text-bold text-center">--- Biodata Management ---</p>
              <div class="form-group">
                <label for="setting-biodata-name">Full Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="setting-biodata-name"
                  :value="thisBiodata.name"
                />
              </div>
              <div class="form-group">
                <form
                  id="setting-biodata-image"
                  enctype="multipart/form-data"
                  @submit="uploadImageProfile"
                >
                  <label for="setting-biodata-image-import">Image Profile</label>
                  <div class="custom-file">
                    <input
                      type="file"
                      class="custom-file-input"
                      name="_image"
                      id="setting-biodata-image-import"
                      accept="image/x-png, image/jpeg"
                      @change="autoUploadImageOnChange"
                    />
                    <label
                      class="custom-file-label"
                      for="setting-biodata-image-import"
                    >{{imageUploadOrigin}}</label>
                  </div>
                  <input
                    type="text"
                    id="setting-biodata-image-src"
                    v-model="imageUploadForm"
                    hidden
                    readonly
                  />
                  <input
                    type="submit"
                    class="btn btn-primary"
                    id="setting-biodata-image-submit"
                    style="display: none;"
                  />
                </form>
                <p
                  class="text-muted mt-1"
                  style="font-size: 12px"
                >Image rule: photo dimensions 4x4, format [jpg, jpeg, png], max size 2 MB.</p>
                <img
                  v-if="this.imageUploadResult"
                  class="profile-user-img img-fluid img-circle"
                  :src="`${this.$AppHelper.apiEndpoint()}${this.imageUploadResult}`"
                  alt="user-profile-image"
                />
              </div>
              <button class="btn btn-primary float-right text-bold">
                <i class="fas fa-user-alt"></i>&ensp;Update Biodata
              </button>
            </div>
            <div class="tab-pane" id="password">
              <p class="text-bold text-center">--- Password Management ---</p>
              <div class="form-group">
                <input
                  type="password"
                  class="form-control"
                  id="setting-password-current"
                  placeholder="Current Password"
                />
                <input
                  type="password"
                  class="form-control mt-3"
                  id="setting-password-new"
                  placeholder="New Password"
                />
              </div>
              <button class="btn btn-primary float-right text-bold">
                <i class="fas fa-key"></i>&ensp;Update Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Toastr from "@/third-party/library/toastrjs.min";
export default {
  name: "ProfilePage",
  computed: {
    ...mapGetters(["thisBiodata"])
  },
  methods: {
    autoUploadImageOnChange() {
      this.$("#setting-biodata-image-submit").click();
    },
    uploadImageProfile(e) {
      e.preventDefault();
      this.$axios.get(`/sanctum/csrf-cookie`).then(() => {
        let formImage = new FormData(
          document.getElementById("setting-biodata-image")
        );
        this.$axios
          .post(
            `/api/user/profile?_upload=image`,
            formImage,
            this.$CredMng.axiosHeaderToken()
          )
          .then(res => {
            if (res.data.status == "success") {
              this.imageUploadOrigin = res.data.response_data[0].origin_name;
              this.imageUploadForm = res.data.response_data[0].img_name;
              this.imageUploadResult = res.data.response_data[0].img_name;
            } else {
              this.imageUploadOrigin = "";
              this.imageUploadForm = "";
              this.imageUploadResult = "";
              Toastr.toastError(`${res.data.message._image[0]}`);
            }
          })
          .catch(err => {
            let error = err.toJSON();
            Toastr.toastError(error.message);
          });
      });
    }
  },
  data() {
    return {
      fullNameBiodata: this.$("#setting-biodata-name").val(),
      imageUploadOrigin: "",
      imageUploadForm: "",
      imageUploadResult: ""
    };
  }
};
</script>
import axios from 'axios'
import router from '@/router'
import AppHelper from '@/third-party/helper/app-helper.min.js'
import CredMng from '@/third-party/auth/credential-manager.min.js'
import Toastr from "@/third-party/library/toastrjs.min.js";
let state = {
    thisBiodata: {
        name: "Sir Alpha",
        profile_img: AppHelper.defaultProfileImg(),
        status: "Member",
        biodata: {
            email: "9999999999999999",
            gender: "-"
        }
    },
    sidebarLink: [
        { index: "100", name: "Home", icon: "fas fa-home", link: "Home" },
    ]
};
let getters = {
    thisBiodata: state => state.thisBiodata,
    sidebarLink: state => state.sidebarLink.sort((a, b) => a.index.localeCompare(b.index))
};
let actions = {
    async getBiodata({ commit }) {
        let response = await axios.get(`/api/profile/biodata`, CredMng.axiosHeaderToken())
            .catch(() => {
                Toastr.toastError("Please login first!"),
                    CredMng.credentialKeyRemove(),
                    router.push({ name: "Login" });
            });
        if (response.data.status == "success") {
            return commit("setBiodata", response.data.response_data[0]);
        }
    }
};
let mutations = {
    setBiodata: (state, data) => (state.myBiodata = data)
};

export default {
    state,
    getters,
    actions,
    mutations
};
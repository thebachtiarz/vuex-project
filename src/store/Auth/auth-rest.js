import axios from 'axios'
import router from '@/router'
import AppHelper from '@/third-party/helper/app-helper.min'
import AppLink from '@/third-party/helper/app-link.min'
import CredMng from '@/third-party/auth/credential-manager.min'
import Toastr from "@/third-party/library/toastrjs.min";
let state = {
    thisBiodata: {
        name: "Unnamed",
        profile_img: AppHelper.defaultProfileImg(),
        status: "-",
        email: "-"
    }
};
let getters = {
    thisBiodata: state => state.thisBiodata,
    sidebarLink: state => AppLink.getAddrLink(state.thisBiodata.status).sort((a, b) => a.index.localeCompare(b.index))
};
let actions = {
    async getBiodata({ commit }) {
        await axios.get(`/sanctum/csrf-cookie`).then(async () => {
            let response = await axios.get(`/api/user/profile`, CredMng.axiosHeaderToken())
                .catch(() => {
                    Toastr.toastError("Please login first!"),
                        CredMng.credentialKeyRemove(),
                        router.push({ name: "Login" });
                });
            if (response.data.status == "success") {
                commit("setBiodata", response.data.response_data);
            }
        });
    }
};
let mutations = {
    setBiodata: (state, data) => (state.thisBiodata = data)
};

export default {
    state,
    getters,
    actions,
    mutations
};
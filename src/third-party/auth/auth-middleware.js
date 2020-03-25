import axios from 'axios'
import router from '@/router'
import CredMng from '@/third-party/auth/credential-manager.min.js'
import Toastr from "@/third-party/library/toastrjs.min.js";
const AuthMid = {
    async boolCheck() {
        let res = await axios.get(`/api/auth/creds`, CredMng.axiosHeaderToken()).catch(() => this.doLogout());
        return this.boolCheckRes(res);
    },
    boolCheckRes: (res) => (res && (res.data.status == "success") ? true : false),
    doLogout: () => {
        Toastr.toastError("Please login first!");
        CredMng.credentialKeyRemove();
        router.push({ name: "Login" });
    },
    getRouteAuthProtected: () => {
        return ["Home", "Profile"];
    },
    getRouteUnprotected: () => {
        return ["Login", "Register"];
    }
};
export default AuthMid;
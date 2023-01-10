import requester from "./api";
import apiPath from "./apiPath";

export const userLogin = async (userLogin) => {
    try{
        const res = await requester({
            method: "POST",
            url: apiPath.PROFILE,
            data: userLogin,
        });
        return res;
    } catch(err) {
        throw(err)
    }
};

// Lấy thông tin tài khoản đã đăng nhập
export const getProfile = async ()=> {
    try{
        const res = await requester({
            method: "POST",
            url: apiPath.PROFILE_ACTIONS,
        });
        return res;
    } catch(err) {
        console.log(err)
    }
}

// POST thong tin user signup
export const signUp = async (userSignup) => {
    try{
        const res = await requester({
            method: "POST",
            url: apiPath.USER_SIGNUP,
            data: userSignup,
        });
        return res;
    } catch(err) {
        console.log(err)
    }
}
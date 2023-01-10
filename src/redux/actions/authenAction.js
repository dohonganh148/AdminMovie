import actions from "redux/type";
import * as service from "services/authenService";

export const loginAction = (userLogin) => async (dispatch) => {
    let res = await service.userLogin(userLogin);
    res.data && dispatch({
        type: actions.SET_PROFILE,
        payload: res.data.content,
    });

    localStorage.setItem("token", res.data.content.accessToken);
};

// Lấy thông tin tài khoản đã đăng nhập
export const fetchProfileAction = () => async(dispatch) => {
    let res = await service.getProfile();
    res.data && dispatch({
        type: actions.SET_PROFILE,
        payload: res.data.content,
    })
}

// LOGOUT
export const logoutAction = () => async(dispatch) => {
    localStorage.removeItem("token");
    dispatch({
        type: actions.SET_PROFILE,
        payload: null,
    })
}
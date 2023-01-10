import actions from "redux/type";
import * as service from "services/adminService";

// GET API lay danh sach phim
export const fetchMovieListAction = (pageSize, current) => async (dispatch) => {
    let res = await service.getMovieList(pageSize, current);
    res.data && dispatch({
        type: actions.SET_MOVIE_LIST,
        payload: res.data.content,
    });
};

// GET API lay danh sach he thong rap
export const fetchCinemaList = () => async (dispatch) => {
    let res = await service.getCinemaList();
    res.data && dispatch({
        type: actions.SET_CINEMA_LIST,
        payload: res.data.content,
    });
};

export const fetchCinemaGroup = (id) => async (dispatch) => {
    let res = await service.getCinemGroup(id);
    res.data && dispatch({
        type: actions.SET_CINEMA_GROUP,
        payload: res.data.content,
    });
};

// GET API lay thong tin phim
export const fetchMovieDetail = (id) => async(dispatch) => {
    let res = await service.getMovieDetail(id);
    res.data && dispatch({
        type: actions.SET_MOVIE_DETAIL,
        payload: res.data.content,
    });
};

// GET API lay danh sach nguoi dung
export const fetchUserList = (pageSize, current) => async(dispatch) => {
    let res = await service.getUserList(pageSize, current);
    res.data && dispatch({
        type: actions.USER_LIST,
        payload: res.data.content,
    });
};

// GET API lay danh sach loai nguoi dung
export const fetchTypeOfUser = () => async (dispatch) => {
    let res = await service.getTypeOfUser();
    res.data && dispatch({
        type: actions.SET_TYPE_USER,
        payload: res.data.content,
    });
};

// GET API lay danh sach nguoi dung de search
export const fetchUserListSearch = (keywords) => async (dispatch) => {
    let res = await service.getUserListSearch(keywords);
    res.data && dispatch({
        type: actions.USER_LIST_SEARCH,
        payload: res.data.content,
    })
}
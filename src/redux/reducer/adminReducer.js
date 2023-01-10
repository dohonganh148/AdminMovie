import actions from "redux/type";

const initialState = {
  movieList: [],
  cinemaList: [],
  cinemaGroup: [],
  userList: {},
  movieDetail: {},
  typeOfUser: [],
  userListSearch: [],
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.SET_MOVIE_LIST:
      return {
        ...state,
        movieList: payload,
      };
    case actions.SET_CINEMA_LIST:
      return {
        ...state,
        cinemaList: payload,
      };
    case actions.SET_CINEMA_GROUP:
      return {
        ...state,
        cinemaGroup: payload,
      };
    case actions.SET_MOVIE_DETAIL:
      return {
        ...state,
        movieDetail: payload,
      };
    case actions.USER_LIST:
      return {
        ...state,
        userList: payload,
      };
    case actions.SET_TYPE_USER:
      return {
        ...state,
        typeOfUser: payload,
      };
    case actions.USER_LIST_SEARCH:
      return {
        ...state,
        userList: {
          ...state.userList,
          items: payload,
          totalCount: payload?.length,
        },
      };

    default:
      return { ...state };
  }
};

export default reducer;

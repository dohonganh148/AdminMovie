import actions from "redux/type";

const initialState = {
  profile: null,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.SET_PROFILE:
      return {
        ...state,
        profile: payload,
      };
    default:
      return { ...state };
  }
};

export default reducer;

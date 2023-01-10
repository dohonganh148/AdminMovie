import { applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools} from "redux-devtools-extension";
import adminReducer from "redux/reducer/adminReducer";
import authenReducer from "redux/reducer/authenReducer";

const reducer = combineReducers({
    admin: adminReducer,
    authen: authenReducer,
});

const store = createStore(
    reducer,
    composeWithDevTools( applyMiddleware(thunk))
);
export default store;
import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import product from "./reducers/product";
import notice from "./reducers/notice";
import thunk from "redux-thunk";


const rootReducer = combineReducers({
    product,
    notice
})

export default createStore(rootReducer,compose(applyMiddleware(...[thunk])));
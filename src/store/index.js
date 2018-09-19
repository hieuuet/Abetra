import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
// Logger with default options
import logger from "redux-logger";
import rootReducer from "../reducers/index";

const store = createStore(rootReducer, applyMiddleware(thunk, logger));
export default store;

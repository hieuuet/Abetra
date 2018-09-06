import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
// Logger with default options
import logger from 'redux-logger';
import appStore from "../reducers/index";

const store = createStore(
    appStore,
    applyMiddleware(thunk, logger)
);
export default store;
import { createStore } from "redux";
import { reducers } from "./reducers/index";

const initialApplicationState = {};
const store = createStore(reducers, initialApplicationState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
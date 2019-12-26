// #region Global Imports
import { combineReducers } from "redux";
// #endregion Global Imports

// #region Local Imports
import { ApiReducer } from "./Api";
// #endregion Local Imports

export default combineReducers({
    api: ApiReducer,
});

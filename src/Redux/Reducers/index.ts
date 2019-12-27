// #region Global Imports
import { combineReducers } from "redux";
// #endregion Global Imports

// #region Local Imports
import { ApiReducer } from "./Api";
import { UiReducer } from "./Ui";
// #endregion Local Imports

export default combineReducers({
    api: ApiReducer,
    ui: UiReducer,
});

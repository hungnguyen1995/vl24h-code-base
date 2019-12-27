// #region Local Imports
import { ActionConsts } from "@Definitions";
import { IUI } from "@Redux/IStore";
// #endregion Local Imports

const INITIAL_STATE: IUI = {
    toast: {
        msg: "",
        success: 1,
        uuid: "",
    },
    loading: false,
};

export const UiReducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case ActionConsts.Ui.put_toast_errors:
        case ActionConsts.Ui.put_toast_success:
            return {
                ...state,
                toast: action.payload,
            };
        default:
            return state;
    }
};

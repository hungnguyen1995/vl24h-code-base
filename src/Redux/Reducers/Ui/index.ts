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
    modal: {
        status: false,
        title: "",
        Component: null,
        childProps: null,
    },
    loading: {},
};

export const UiReducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case ActionConsts.Ui.show_modal:
            return {
                ...state,
                modal: {
                    status: true,
                    title: action.title,
                    Component: action.Component,
                    childProps: action.childProps,
                },
            };
        case ActionConsts.Ui.hide_modal:
            return {
                ...state,
                modal: {
                    status: false,
                    title: "",
                    Component: null,
                    childProps: null,
                },
            };
        case ActionConsts.Ui.put_toast_errors:
        case ActionConsts.Ui.put_toast_success:
            return {
                ...state,
                toast: action.payload,
            };
        case ActionConsts.Ui.show_loading:
            return {
                ...state,
                loading: {
                    [action.id]: true,
                },
            };
        case ActionConsts.Ui.hide_loading:
            return {
                ...state,
                loading: {
                    [action.id]: false,
                },
            };
        default:
            return state;
    }
};

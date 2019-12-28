// #region Local Imports
import { ActionConsts } from "@Definitions";
// #endregion Local Imports

const INITIAL_STATE = {};

export const ApiReducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case ActionConsts.Api.receive_api_reset:
            return {
                INITIAL_STATE,
            };
        case ActionConsts.Api.receive_api_fail:
        case ActionConsts.Api.receive_api_async:
        case ActionConsts.Api.receive_api:
            return {
                ...state,
                [action.name]: { ...action.payload, args: action.args },
            };
        default:
            return state;
    }
};

import { Dispatch } from "redux";
import { ActionConsts } from "@Definitions";
import { putErrors, putSuccess } from "./Ui";

export const requestApi = (
    fn: (body: any) => Promise<unknown>,
    name: string,
    args: any
) => async (dispatch: Dispatch) => {
    try {
        const payload: any = await fn(args);
        if (payload.statusCode === 504) {
            dispatch(putErrors("Máy chủ đang bận."));
            dispatch({
                type: ActionConsts.Api.receive_api_fail,
                payload,
                name,
                args,
            });
        } else if (payload.statusCode && payload.code === 440) {
            dispatch(putErrors("JWT expired"));
            dispatch({
                type: ActionConsts.Api.receive_api_fail,
                payload,
                name,
                args,
            });
        } else {
            dispatch(putSuccess("Fetch thành công."));
            dispatch({
                type: ActionConsts.Api.receive_api,
                payload,
                name,
                args,
            });
        }
    } catch (e) {
        dispatch(putErrors(e));
    }
};

export const requestApiAsync = (
    fns: any[],
    names: string[],
    name: string,
    args: any[]
) => async (dispatch: Dispatch) => {
    try {
        const promises = fns.map(async (fn, value) => {
            try {
                return await fn(args[value]);
            } catch (e) {
                throw new Error(e);
            }
        });
        const response = await Promise.all(promises);
        const payload = names.reduce((obj, key, index) => {
            if (response[index].code !== 200) {
                dispatch(
                    putErrors(
                        `Lỗi - ${response[index].code} - ${key}-${response[index].msg} `
                    )
                );
            }
            return { ...obj, [key]: response[index] };
        }, {});
        await dispatch({
            type: ActionConsts.Api.receive_api_async,
            payload,
            name,
            args,
        });
    } catch (e) {
        dispatch(putErrors(e));
    }
};

export const requestResetApi = () => {
    return {
        type: ActionConsts.Api.receive_api_reset,
    };
};

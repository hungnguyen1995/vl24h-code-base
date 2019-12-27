import { Dispatch } from "redux";
import { ActionConsts } from "@Definitions";

interface IPayload {
    statusCode: number;
    data: any;
}

export const Request = {
    Api: (
        fn: (body: any) => Promise<unknown>,
        name: string,
        args: any
    ) => async (dispatch: Dispatch) => {
        const payload: any = await fn(args);
        if (payload.statusCode === 504) {
            await dispatch({
                type: ActionConsts.Api.request_api_fail,
                payload,
                name,
                args,
            });
        } else {
            await dispatch({
                type: ActionConsts.Api.receive_api,
                payload,
                name,
                args,
            });
        }
    },
};

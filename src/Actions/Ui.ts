import { ActionConsts } from "@Definitions";
// @ts-ignore
import uuidv4 from "uuid/v4";

export const putSuccess = (msg: string) => {
    const uuid = uuidv4();
    return {
        type: ActionConsts.Ui.put_toast_success,
        payload: {
            msg,
            uuid,
            success: 1,
        },
    };
};
export const putErrors = (msg: string) => {
    const uuid = uuidv4();
    return {
        type: ActionConsts.Ui.put_toast_errors,
        payload: {
            msg,
            uuid,
            success: 0,
        },
    };
};

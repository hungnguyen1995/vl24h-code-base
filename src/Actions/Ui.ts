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

export const showModal = payload => ({
    type: ActionConsts.Ui.show_modal,
    status: true,
    title: payload.title,
    Component: payload.Component,
    childProps: payload.childProps,
});

export const hideModal = () => ({
    type: ActionConsts.Ui.hide_modal,
});

export const showLoading = (id: string) => ({
    type: ActionConsts.Ui.show_loading,
    id,
});

export const hideLoading = (id: string) => ({
    type: ActionConsts.Ui.hide_loading,
    id,
});

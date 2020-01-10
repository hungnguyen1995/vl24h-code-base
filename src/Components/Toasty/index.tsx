import React, { useEffect, memo } from "react";
import { toast, ToastContainer, Flip } from "react-toastify";
import { useSelector, shallowEqual } from "react-redux";
import { IStore, IToasty } from "@Redux/IStore";

const Toasty: React.FunctionComponent = memo(
    (): JSX.Element => {
        const toasty: IToasty = useSelector(
            (state: IStore) => state.ui.toast,
            shallowEqual
        ) as IToasty;
        useEffect(() => {
            if (toasty.uuid) {
                if (toasty.success === 1) {
                    toast.info(`✔️  ${JSON.stringify(toasty.msg)}`, {
                        transition: Flip,
                        autoClose: 3000,
                    });
                } else {
                    toast.error(`❗️ ${toasty.msg}`, {
                        transition: Flip,
                        autoClose: 3000,
                    });
                }
            }
        }, [toasty]);

        return (
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
                pauseOnHover
            />
        );
    }
);

export { Toasty };

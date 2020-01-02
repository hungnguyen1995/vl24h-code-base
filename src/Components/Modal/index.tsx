import React, { useCallback } from "react";
import ReactModal from "react-modal";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { IStore, IModal } from "@Redux/IStore";
import { hideModal } from "@Actions";

const Modal: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const modal: IModal = useSelector(
        (state: IStore) => state.ui.modal,
        shallowEqual
    ) as IModal;

    const { title, status, Component, childProps } = modal;

    const handleCloseModal = useCallback(() => {
        dispatch(hideModal());
    }, [dispatch]);
    const Style = {
        content: {
            width: "60%",
            marginLeft: "20%",
            top: "54px",
            left: "unset",
            right: "unset",
            bottom: "unset",
        },
    };

    return (
        <ReactModal
            style={Style}
            ariaHideApp={false}
            isOpen={status}
            contentLabel={title}
            onRequestClose={handleCloseModal}
            shouldCloseOnOverlayClick
        >
            {Component && <Component {...childProps} />}
        </ReactModal>
    );
};

export { Modal };

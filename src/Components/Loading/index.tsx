import React, { memo } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { ILoading, IStore } from "@Redux/IStore";

interface IProps {
    idLoading: string;
}

const Loading = memo((props: IProps): any => {
    const { idLoading } = props;
    const loading: ILoading = useSelector(
        (state: IStore) => state.ui.loading,
        shallowEqual
    ) as ILoading;

    if (!loading[idLoading]) {
        return null;
    }

    return (
        <div id={`${idLoading}Loading`}>
            <div id="overlay" />
            <div className="lds-ellipsis">
                <div />
                <div />
                <div />
                <div />
            </div>
        </div>
    );
});

export { Loading };

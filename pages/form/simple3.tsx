import React from "react";
import { withFormLayout, Loading } from "@Components";
import { ReduxNextPageContext } from "@Interfaces/Pages/App";
import { FormHook } from "@Components";

let renderCount = 0;

const AccountSettingsProfile = () => {
    renderCount += 1;
    return (
        <>
            <Loading idLoading="form1" />
            <div className="row">
                <div className="col-12 text-center">
                    <span>{`Số lần render: ${renderCount}`}</span>
                </div>
            </div>
            <FormHook config={[]} />
        </>
    );
};

AccountSettingsProfile.getInitialProps = async (): Promise<any> => {
    const meta = {
        title: "Form Hooks",
        description: "Trang chủ",
        background: "#836b9d",
    };
    return { namespacesRequired: ["common"], data: {}, meta };
};
AccountSettingsProfile.getLayout = withFormLayout;

export default AccountSettingsProfile;

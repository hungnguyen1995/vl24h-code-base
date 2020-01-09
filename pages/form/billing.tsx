import React from "react";
import { withFormLayout } from "@Components";
import { ReduxNextPageContext } from "@Interfaces/Pages/App";

const AccountSettingsBilling = () => (
    <h1>
        task 2
    </h1>
);

AccountSettingsBilling.getInitialProps = async (
    ctx: ReduxNextPageContext
): Promise<any> => {
    const meta = {
        title: "Form Hooks",
        description: "Trang chủ",
        background: "#836b9d",
    };
    return { namespacesRequired: ["common"], data: {}, meta };
};
AccountSettingsBilling.getLayout = withFormLayout;

export default AccountSettingsBilling;

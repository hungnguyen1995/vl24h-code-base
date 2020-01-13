import React from "react";
import { withFormLayout, Loading, FormHook } from "@Components";

let renderCount = 0;

const configForm = {
    items: [
        {
            elementType: "input",
            name: "name",
            type: "text",
            label: "Họ tên",
            rules: {
                required: "Vui lòng nhập Họ tên",
            },
            isRequired: true,
            md: 12,
        },
        {
            elementType: "input",
            name: "phone",
            type: "number",
            label: "Số điện thoại",
            rules: {
                required: "Vui lòng nhập Số điện thoại",
                minLength: { value: 10, message: "Phải lớn hơn 10 số" },
            },
            isRequired: true,
            md: 12,
        },
        {
            elementType: "select",
            name: "city",
            type: "number",
            label: "Địa điểm",
            rules: {
                required: "Vui lòng chọn Địa điểm",
            },
            isRequired: true,
            options: [
                {
                    value: "",
                    label: "Chọn Tỉnh",
                },
                {
                    value: 1,
                    label: "Tất cả",
                },
                {
                    value: 2,
                    label: "Hà Nội",
                },
                {
                    value: 3,
                    label: "Hồ Chí Minh",
                },
            ],
            md: 12,
        },
        {
            elementType: "input",
            name: "note",
            type: "textarea",
            label: "Ghi Chú",
            rules: {
                required: "Vui lòng nhập ghi chú",
            },
            isRequired: true,
            md: 12,
        },
    ],
};

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
            <FormHook config={configForm} />
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

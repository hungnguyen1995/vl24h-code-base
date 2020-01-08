import React, { useState } from "react";
import { withFormLayout } from "@Components";
import { ReduxNextPageContext } from "@Interfaces/Pages/App";
import { useForm } from "react-hook-form";

interface IForm {
    firstName: string;
    lastName: string;
    phone: number;
    policy: boolean;
}
let renderCount = 0;
const AccountSettingsProfile = () => {
    const [data, setData] = useState(null);
    renderCount += 1;
    const { register, errors, handleSubmit, formState } = useForm<IForm>();
    const { touched } = formState;
    const onSubmit = value => setData(value);
    return (
        <>
            <div className="row">
                <div className="col-12 text-center">
                    <span>{`Số lần render: ${renderCount}`}</span>
                </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-row ">
                    <div className="col-md-12 ">
                        <label htmlFor="validationServer01" className="w-100">
                            Họ
                            <input
                                type="text"
                                className={`form-control ${
                                    // eslint-disable-next-line no-nested-ternary
                                    errors?.firstName
                                        ? "is-invalid"
                                        : touched?.firstName
                                        ? "is-valid"
                                        : ""
                                }`}
                                id="validationServer01"
                                placeholder="Nguyen"
                                name="firstName"
                                ref={register({
                                    required: "Vui lòng nhập Họ",
                                    maxLength: {
                                        value: 6,
                                        message: "Không được quá 6 ký tự",
                                    },
                                })}
                            />
                            <div className="invalid-feedback">
                                {errors.firstName && errors.firstName.message}
                            </div>
                        </label>
                    </div>
                </div>
                <div className="form-row ">
                    <div className="col-md-12 ">
                        <label htmlFor="validationServer02" className="w-100">
                            Tên
                            <input
                                type="text"
                                className={`form-control ${
                                    // eslint-disable-next-line no-nested-ternary
                                    errors?.lastName
                                        ? "is-invalid"
                                        : touched?.lastName
                                        ? "is-valid"
                                        : null
                                }`}
                                id="validationServer02"
                                placeholder="First name"
                                name="lastName"
                                ref={register({
                                    required: "Vui lòng nhập Tên",
                                    minLength: {
                                        value: 2,
                                        message: "Không được ít hơn 2 ký tự",
                                    },
                                })}
                            />
                            <div className="invalid-feedback">
                                {errors.lastName && errors?.lastName?.message}
                            </div>
                        </label>
                    </div>
                </div>
                <div className="form-row ">
                    <div className="col-md-12 ">
                        <label htmlFor="validationServer03" className="w-100">
                            Số ĐT
                            <input
                                type="number"
                                className={`form-control ${
                                    // eslint-disable-next-line no-nested-ternary
                                    errors?.phone
                                        ? "is-invalid"
                                        : touched?.phone
                                        ? "is-valid"
                                        : null
                                }`}
                                id="validationServer03"
                                placeholder="SDT"
                                name="phone"
                                ref={register({
                                    required: "Vui lòng nhập SĐT",
                                    minLength: {
                                        value: 10,
                                        message:
                                            "Vui lòng nhập nhiều hơn 10 số",
                                    },
                                })}
                            />
                            <div className="invalid-feedback">
                                {errors.phone && errors?.phone?.message}
                            </div>
                        </label>
                    </div>
                </div>
                <div className="form-group">
                    <div className="form-check">
                        <label
                            className="form-check-label"
                            htmlFor="invalidCheck3"
                        >
                            <input
                                className="form-check-input is-invalid"
                                type="checkbox"
                                id="invalidCheck3"
                                name="policy"
                                ref={register({
                                    required: "Vui lòng đồng ý điều khoản",
                                })}
                            />
                            Đồng ý điều khoản
                            <div className="invalid-feedback">
                                {errors.policy && errors?.policy?.message}
                            </div>
                        </label>
                    </div>
                </div>
                <button className="btn btn-primary" type="submit">
                    Submit form
                </button>
            </form>
            <div className="row mt-2">
                {data && (
                    <pre style={{ textAlign: "left", color: "black" }}>
                        {JSON.stringify(data, null, 2)}
                    </pre>
                )}
            </div>
        </>
    );
};

AccountSettingsProfile.getInitialProps = async (
    ctx: ReduxNextPageContext
): Promise<any> => {
    const meta = {
        title: "Form Hooks",
        description: "Trang chủ",
        background: "#836b9d",
    };
    return { namespacesRequired: ["common"], data: {}, meta };
};
AccountSettingsProfile.getLayout = withFormLayout;

export default AccountSettingsProfile;

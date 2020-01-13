import React, { useState } from "react";
import { withFormLayout, Loading } from "@Components";
import { useForm, Controller } from "react-hook-form";
import { showLoading, hideLoading } from "@Actions";
import { useDispatch } from "react-redux";
import Select from "react-select";
import DatePicker from "react-datepicker";

interface IForm {
    [key: string]: boolean;
}
let renderCount = 0;
const option = [
    { value: 1, label: "Toàn Quốc" },
    { value: 2, label: "Miền Bắc" },
    { value: 3, label: "Miền Nam" },
    { value: 4, label: "Miền Đông" },
    { value: 5, label: "Miền Tây" },
    { value: 6, label: "Miền Trung" },
];
const SimpleForm2 = () => {
    renderCount += 1;
    const [data, setData] = useState(null);
    const [date, setDate] = useState(null);
    const dispatch = useDispatch();
    const {
        register,
        errors,
        handleSubmit,
        formState,
        control,
        getValues,
    } = useForm<IForm>();

    const onSubmit = value => {
        dispatch(showLoading("form2"));
        setTimeout(() => {
            dispatch(hideLoading("form2"));
            setData(value);
        }, 500);
    };

    const val = getValues({ nest: true });
    console.log(val, "giá trị: getValues");
    console.log(errors, "giá trị: errors");
    return (
        <>
            <Loading idLoading="form1" />
            <div className="row">
                <div className="col-12 text-center">
                    <span>{`Số lần render: ${renderCount}`}</span>
                </div>
            </div>
            <div className="">
                <form onSubmit={handleSubmit(onSubmit)} className="form-hook">
                    <Loading idLoading="form2" />
                    <div className="form-row">
                        <div className="col-md-6">
                            <label
                                htmlFor="validationServer01"
                                className="w-100"
                            >
                                Địa chỉ
                            </label>
                            <input
                                type="text"
                                className={`form-control ${
                                    // eslint-disable-next-line no-nested-ternary
                                    errors?.address
                                        ? "is-invalid"
                                        : formState?.touched?.address
                                        ? "is-valid"
                                        : ""
                                }`}
                                id="validationServer01"
                                placeholder="Nguyen"
                                name="address"
                                ref={register({
                                    required: "Vui lòng nhập Họ",
                                    minLength: {
                                        value: 7,
                                        message: "Không được ít hơn 7 ký tự",
                                    },
                                })}
                            />
                            <div className="invalid-feedback">
                                {errors.address && errors.address.message}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <label> Chọn Tỉnh thành </label>
                            <Controller
                                as={<Select />}
                                styles={{
                                    control: base => ({
                                        ...base,
                                        borderColor: `${
                                            // eslint-disable-next-line no-nested-ternary
                                            errors?.select
                                                ? "#dc3545"
                                                : formState?.touched?.select
                                                ? "#28a745"
                                                : "#ced4da"
                                        }`,
                                    }),
                                }}
                                options={option}
                                name="select"
                                isClearable
                                isMulti
                                control={control}
                                onChange={([selected]) => {
                                    return { value: selected };
                                }}
                                rules={{ required: "Không Được Trống" }}
                            />
                            <div className="invalid-feedback d-block">
                                {errors.select && errors.select.message}
                            </div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-6">
                            <label> Chọn thời gian </label>
                            <Controller
                                as={<DatePicker />}
                                className={`form-control w-100 ${
                                    // eslint-disable-next-line no-nested-ternary
                                    errors?.date
                                        ? "is-invalid"
                                        : formState?.touched?.date
                                        ? "is-valid"
                                        : ""
                                }`}
                                name="date"
                                selected={date}
                                rules={{ required: "vui lòng chọn ngày" }}
                                control={control}
                                onChange={([value]) => {
                                    setDate(value);
                                    return value;
                                }}
                            />
                            <div className="invalid-feedback d-block">
                                {errors.date && errors.date.message}
                            </div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-12">
                            <label className="w-100"> Ghi chú </label>
                            <textarea
                                className={`form-control ${
                                    // eslint-disable-next-line no-nested-ternary
                                    errors?.note
                                        ? "is-invalid"
                                        : formState?.touched?.note
                                        ? "is-valid"
                                        : ""
                                }`}
                                placeholder="Nguyen"
                                name="note"
                                ref={register({
                                    required: "Vui lòng nhập Note",
                                    minLength: {
                                        value: 10,
                                        message: "Không được ít hơn 10 ký tự",
                                    },
                                })}
                            />
                            <div className="invalid-feedback">
                                {errors.note && errors.note.message}
                            </div>
                        </div>
                    </div>
                    <div className="form-row mt-4">
                        <div className="col-md-12">
                            <div className="custom-file">
                                <input
                                    type="file"
                                    className={`custom-file-input form-control ${
                                        // eslint-disable-next-line no-nested-ternary
                                        errors?.img
                                            ? "is-invalid"
                                            : formState?.touched?.img
                                            ? "is-valid"
                                            : ""
                                    }`}
                                    id="validatedCustomFile"
                                    name="img"
                                    ref={register({
                                        required: "Vui lòng nhập IMG",
                                    })}
                                />
                                <label
                                    className="custom-file-label"
                                    htmlFor="validatedCustomFile"
                                >
                                    Choose file...
                                </label>
                                <div className="invalid-feedback d-block">
                                    {errors.img && errors.img.message}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-row mt-2">
                        <div className="col-md-12">
                            <div className="custom-control custom-checkbox mb-3">
                                <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="invalidCheck3"
                                    name="policy"
                                    ref={register({
                                        required: "Vui lòng đồng ý điều khoản",
                                    })}
                                />
                                <label
                                    className="custom-control-label"
                                    htmlFor="invalidCheck3"
                                >
                                    Đồng ý điều khoản
                                </label>
                                <div className="invalid-feedback d-block">
                                    {errors.policy && errors?.policy?.message}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="md-auto m-auto">
                            <button className="btn btn-primary" type="submit">
                                Đăng kí
                            </button>
                        </div>
                    </div>
                </form>
            </div>
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

SimpleForm2.getInitialProps = async (): Promise<any> => {
    const meta = {
        title: "Form Hooks",
        description: "Trang chủ",
        background: "#5e989d",
    };
    return { namespacesRequired: ["common"], data: {}, meta };
};
SimpleForm2.getLayout = withFormLayout;

export default SimpleForm2;

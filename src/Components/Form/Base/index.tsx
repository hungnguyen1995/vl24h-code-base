import React, { useEffect, memo } from "react";
import { FormContext, useForm } from "react-hook-form";
interface IForm {
    config: [];
}

const FormHook = (props: IForm) => {
    const methods = useForm();
    const onSubmit = data => {
        console.log(data);
    };

    return (
        <FormContext {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="form-hook was-validated">
                <div className="form-row">
                    <div className="col-md-12 mb-3">
                        <label htmlFor="validationTooltip01">First name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="validationTooltip01"
                            placeholder="First name"
                        />
                        <div className="invalid-tooltip">Lỗi!</div>
                    </div>
                </div>
            </form>
        </FormContext>
    );
};

export { FormHook };

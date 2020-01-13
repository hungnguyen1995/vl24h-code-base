import React from "react";
import { useFormContext } from "react-hook-form";
import { IItem } from "@Interfaces/IForm";

const Radio = (props: IItem) => {
    const { register, errors, formState }: any = useFormContext();
    const { type, name, rules, placeholder, label, isRequired } = props;

    let className: string = "form-control ";
    if (errors && errors[name]) {
        className += "is-invalid";
    } else if (formState?.touched[name]) {
        className += "is-valid";
    }

    return (
        <div className="row">
            <div className="col-md-3 text-right">
                <label htmlFor={name}>{label}</label>
                {isRequired && <span className="text-danger"> *</span>}
            </div>
            <div className="col-md-9">
                {type === "textarea" ? (
                    <textarea
                        className={className}
                        id={name}
                        placeholder={placeholder}
                        name={name}
                        ref={register(rules)}
                    />
                ) : (
                    <input
                        type={type}
                        className={className}
                        id={name}
                        placeholder={placeholder}
                        name={name}
                        ref={register(rules)}
                    />
                ) }
                <div className="invalid-feedback d-block">
                    {errors[name] && errors[name].message}
                </div>
            </div>
        </div>
    );
};

export { Radio };

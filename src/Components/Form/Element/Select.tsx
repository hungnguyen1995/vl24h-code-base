import React from "react";
import { useFormContext } from "react-hook-form";
import { IItem } from "@Interfaces/IForm";

const Select = (props: IItem) => {
    const { register, errors, formState }: any = useFormContext();
    const { name, rules, placeholder, label, isRequired, options } = props;
    console.log(errors, "giá trị: errors")
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
                <select
                    className={className}
                    id={name}
                    placeholder={placeholder}
                    name={name}
                    ref={register(rules)}
                >
                    {options &&
                        options.map(_ => (
                            <option value={_.value} key={_.value}>
                                {_.label}
                            </option>
                        ))}
                </select>
                <div className="invalid-feedback d-block">
                    {errors[name] && errors[name].message}
                </div>
            </div>
        </div>
    );
};

export { Select };

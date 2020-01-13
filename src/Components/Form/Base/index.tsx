import React from "react";
import { FormContext, useForm } from "react-hook-form";
// eslint-disable-next-line import/named
import { IFormHook, IForm } from "@Interfaces/IForm";
// eslint-disable-next-line import/named
import { Input, Select, Radio } from "../Element";

let renderCount = 0;

const FormHook = (props: IFormHook) => {
    const { config } = props;
    renderCount += 1;
    console.log(renderCount, "giá trị: renderCount");
    const methods = useForm<IForm>();

    const onSubmit = data => {
        console.log(data);
    };

    const formContent: any[] = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const item of config.items) {
        let input;
        switch (item.elementType) {
            case "input": {
                input = <Input {...item} />;
                break;
            }
            case "select": {
                input = <Select {...item} />;
                break;
            }
            default: {
                input = null;
            }
        }
        const formMd = <div className="col-md-12">{input}</div>;
        const formRow = (
            <div className="form-row mt-3" key={item.name}>
                {formMd}
            </div>
        );
        formContent.push(formRow);
    }

    return (
        <FormContext {...methods}>
            <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="form-hook"
            >
                {formContent}
                <div className="form-row mt-3">
                    <div className="md-auto m-auto">
                        <button className="btn btn-primary" type="submit">
                            Đăng kí
                        </button>
                    </div>
                </div>
            </form>
        </FormContext>
    );
};

export { FormHook };

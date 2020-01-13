export interface IItem {
    name: string;
    type?: string;
    label: string;
    rules: object;
    isRequired?: boolean;
    elementType: string;
    md?: number;
    placeholder?: string;
    options?: any[];
}
interface IConfig {
    items: IItem[];
}

export interface IFormHook {
    config: IConfig;
}

export interface IForm {
    [key: string]: boolean;
}

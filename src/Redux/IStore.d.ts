// #region Interface Imports
// #endregion Interface Imports

export interface IToasty {
    msg: string;
    success: number;
    uuid: string;
}

export interface IUI {
    toast?: IToasty;
    loading?: any;
}

export interface IStore {
    api: any;
    ui: IUI;
}

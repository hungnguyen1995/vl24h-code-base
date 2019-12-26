// #region Global Imports
// #endregion Global Imports

export interface IAction {
    type: string;
    args: any;
    name: string;
    payload: any;
}

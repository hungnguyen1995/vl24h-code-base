// #region Global Imports
import "isomorphic-unfetch";
import getConfig from "next/config";
// #endregion Global Imports

const {
    publicRuntimeConfig: { API_URL },
} = getConfig();

const BaseUrl = `${API_URL}`;

export const Http = {
    createHeaders: (tokenAuth: string) => {
        const headers = {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "",
        };

        if (tokenAuth) {
            headers.Authorization = `Bearer ${tokenAuth}`;
        }
        return headers;
    },
    processResponse: (response: any) => {
        const statusCode = response.status;
        const data = response.json();
        console.log(data, "giá trị: data");
        return Promise.all([statusCode, data]).then(res => ({
            statusCode: res[0],
            data: res[1],
        }));
    },

    callApi: async (method: string, endpoint: any, payload: any) => {
        const body = payload;
        let token;
        let user;
        let newEndPoint = endpoint;
        if (typeof window !== "undefined") {
            // GetToken nếu là Client Side
            // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
            user = JSON.parse(<any>localStorage.getItem("user"));
            token = user?.token ? user.token : "";
        }
        if (body?.token) {
            token = body?.token ? body.token : "";
            delete body.token;
        }
        const optionFetch: any = {
            method,
            headers: Http.createHeaders(token),
        };

        if (method === "get") {
            if (Object.keys(body).length !== 0) {
                const queryString = Object.keys(body)
                    .map(key => {
                        let valueQuery;
                        if (typeof body[key] === "object") {
                            const queryArray: string[] = [];
                            if (!body[key]) {
                                return null;
                            }
                            Object.keys(body[key]).forEach(k => {
                                queryArray.push(`${key}[${k}]=${body[key][k]}`);
                            });
                            valueQuery = queryArray.join("&");
                        } else {
                            valueQuery = `${key}=${body[key]}`;
                        }
                        if (!valueQuery) {
                            return null;
                        }
                        return valueQuery;
                    })
                    .filter(item => !!item)
                    .join("&");
                newEndPoint = `${endpoint}?${queryString}`;
            }
        } else {
            optionFetch.body = JSON.stringify(body);
        }
        console.log(optionFetch, "giá trị: optionFetch");
        console.log(`${BaseUrl}${newEndPoint}`, "giá trị: `${BaseUrl}${newEndPoint}`")
        return fetch(`${BaseUrl}${newEndPoint}`, optionFetch)
            .then(Http.processResponse)
            .then(res => ({ ...res.data, statusCode: res.statusCode }))
            .catch(e => {
                // eslint-disable-next-line no-console
                console.warn(e);
                return { statusCode: 504 };
            });
    },

    apiGet: (endpoint: any, body: any) =>
        new Promise(resolve =>
            Http.callApi("get", endpoint, body)
                .then(response => {
                    resolve(response);
                })
                .catch(() => {
                    const response = {
                        data: [],
                        error: 1,
                        msg: "Call API Failure !!!",
                    };
                    resolve(response);
                })
        ),

    apiPost: (endpoint: any, body: any) =>
        new Promise(resolve =>
            Http.callApi("post", endpoint, body)
                .then(response => {
                    resolve(response);
                })
                .catch(() => {
                    const response = {
                        data: [],
                        error: 1,
                        msg: "Call API Failure !!!",
                    };
                    resolve(response);
                })
        ),

    apiPut: (endpoint: any, body: any) =>
        new Promise(resolve =>
            Http.callApi("put", endpoint, body)
                .then(response => {
                    resolve(response);
                })
                .catch(() => {
                    const response = {
                        data: [],
                        error: 1,
                        msg: "Call API Failure !!!",
                    };
                    resolve(response);
                })
        ),

    apiDelete: (endpoint: any, body: any) =>
        new Promise(resolve =>
            Http.callApi("delete", endpoint, body)
                .then(response => {
                    resolve(response);
                })
                .catch(() => {
                    const response = {
                        data: [],
                        error: 1,
                        msg: "Call API Failure !!!",
                    };
                    resolve(response);
                })
        ),
};

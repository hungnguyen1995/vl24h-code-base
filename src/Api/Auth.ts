import { ApiUrl } from "@Definitions";
import { Http } from "@Services";

export const Auth = {
    getInfo: async (body: any) =>
        Http.apiGet(ApiUrl.Auth.getInfo, { token: body }),
};

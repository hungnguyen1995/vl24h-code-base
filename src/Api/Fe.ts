import { ApiUrl } from "@Definitions";
import { Http } from "@Services";

export const Fe = {
    getCommon: async (body: any) =>
        Http.apiGet(ApiUrl.Fe.init, { token: body }),
};

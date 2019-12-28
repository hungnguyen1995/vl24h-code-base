// fake API local via API Nasa
const devProxy: { [key: string]: {} } = {
    "/api": {
        target: "http://api.hr360.sieuviet-dev.com",
        pathRewrite: { "^/api": "" },
        changeOrigin: true,
    },
};

export default devProxy;

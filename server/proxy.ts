// fake API local via API Nasa
const devProxy: { [key: string]: {} } = {
    "/api": {
        target: "https://api.nasa.gov",
        pathRewrite: { "^/api": "" },
        changeOrigin: true,
    },
};

export default devProxy;

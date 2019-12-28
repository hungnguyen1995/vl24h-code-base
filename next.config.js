const { optional, withPlugins } = require("next-compose-plugins");
const withCSS = require("@zeit/next-css");
const withSass = require("@zeit/next-sass");
const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");
const nextRuntimeDotenv = require("next-runtime-dotenv");
const {
    PHASE_DEVELOPMENT_SERVER,
    PHASE_PRODUCTION_BUILD,
} = require("next/constants");
const path = require("path");

// ###### ---Init Config---

const withConfig = nextRuntimeDotenv({ public: ["API_URL", "API_KEY"] });
const toNextPlugin = (plugin, optKey) => (nextConfig = {}) => ({
    ...nextConfig,
    ...{
        // define in which phases this plugin should get applied.
        // you can also use multiple phases or negate them.
        // however, users can still overwrite them in their configuration if they really want to.
        phases: [PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD],

        webpack(config, options) {
            if (!options.isServer) {
                // eslint-disable-next-line new-cap
                config.plugins.push(
                    // eslint-disable-next-line new-cap
                    new plugin(optKey ? nextConfig[optKey] : nextConfig)
                );
            }

            if (typeof nextConfig.webpack === "function") {
                return nextConfig.webpack(config, options);
            }

            return config;
        },
    },
});

const nextConfig = {
    analyzeServer: ["server", "both"].includes(process.env.BUNDLE_ANALYZE),
    analyzeBrowser: ["browser", "both"].includes(process.env.BUNDLE_ANALYZE),
    bundleAnalyzerConfig: {
        server: {
            analyzerMode: "static",
            reportFilename: "../bundles/server.html",
        },
        browser: {
            analyzerMode: "static",
            reportFilename: "../bundles/client.html",
        },
    },
    publicRuntimeConfig: {
        name: "base",
        description: "Base Web App Project",
        keywords: "react.js, next.js",
        themeColor: "#ffffff",
        backgroundColor: "#ffffff",
        NAME_APP: "Code Base",
        THEME_COLOR: "#fffff",
        PROXY_MODE: process.env.PROXY_MODE,
        API_URL: process.env.API_URL,
        API_KEY: process.env.API_KEY,
        STATIC_PATH: process.env.STATIC_PATH,
        GTM_KEY: process.env.GTM_KEY,
        GA_KEY: process.env.GA_KEY,
    },
};

// ##### ---Config Plugin---

const withOffline = [
    // eslint-disable-next-line global-require
    optional(() => require("next-offline")),
    {
        workboxOpts: {
            swDest: "static/service-worker.js",
            clientsClaim: true,
            skipWaiting: true,
            exclude: ["robots.txt"],
            runtimeCaching: [
                {
                    urlPattern: /\//,
                    handler: "NetworkFirst",
                    options: {
                        cacheName: "html-cache",
                        expiration: {
                            maxAgeSeconds: 60 * 60 * 24, // 1 day
                        },
                        cacheableResponse: {
                            statuses: [0, 200],
                        },
                    },
                },
                {
                    urlPattern: /\.(?:json)$/,
                    handler: "CacheFirst",
                    options: {
                        cacheName: "json-cache",
                        expiration: {
                            maxAgeSeconds: 60 * 60 * 24 * 30, // 1 month
                        },
                        cacheableResponse: {
                            statuses: [0, 200],
                        },
                    },
                },
                {
                    urlPattern: /\.(?:png|jpg|jpeg|svg|gif|ico)$/,
                    handler: "CacheFirst",
                    options: {
                        cacheName: "images-cache",
                        expiration: {
                            maxEntries: 50,
                            maxAgeSeconds: 60 * 60 * 24, // 1 day
                        },
                        cacheableResponse: {
                            statuses: [0, 200],
                        },
                    },
                },
                {
                    urlPattern: /\.(?:css)$/,
                    handler: "CacheFirst",
                    options: {
                        cacheName: "global-styles-cache",
                        expiration: {
                            maxAgeSeconds: 60 * 60 * 24, // 1 day
                        },
                        cacheableResponse: {
                            statuses: [0, 200],
                        },
                    },
                },
                {
                    urlPattern: /^https:\/\/fonts\.(gstatic|googleapis)\.com/,
                    handler: "CacheFirst",
                    options: {
                        cacheName: "fonts-cache",
                        expiration: {
                            maxAgeSeconds: 60 * 60 * 24 * 30, // 1 month
                        },
                        cacheableResponse: {
                            statuses: [0, 200],
                        },
                    },
                },
            ],
        },
        experimental: {
            async rewrites() {
                return [
                    {
                        source: "/service-worker.js",
                        destination: "/_next/static/service-worker.js",
                    },
                ];
            },
        },
    },
    [PHASE_PRODUCTION_BUILD],
];

const withPwaManifest = [
    // eslint-disable-next-line global-require
    optional(() =>
        toNextPlugin(require("webpack-pwa-manifest"), "pwaManifestOps")
    ),
    {
        pwaManifestOps: {
            filename: "static/manifest.json",
            inject: false,
            fingerprints: false,
            includeDirectory: true,
            publicPath: "/_next",
            name: nextConfig.publicRuntimeConfig.name,
            short_name: nextConfig.publicRuntimeConfig.name,
            description: nextConfig.publicRuntimeConfig.description,
            background_color: nextConfig.publicRuntimeConfig.backgroundColor,
            theme_color: nextConfig.publicRuntimeConfig.themeColor,
            display: "standalone",
            orientation: "portrait",
            start_url: "/?utm_source=HomeScreen",
            icons: [
                {
                    src: path.resolve("static/images/favicon.png"),
                    sizes: [180],
                    type: "image/png",
                    destination: "static/icons",
                    ios: true,
                },
                {
                    src: path.resolve("static/images/favicon.png"),
                    size: 1024,
                    type: "image/png",
                    destination: "static/icons",
                    ios: "startup",
                },
                {
                    src: path.resolve("static/images/favicon.png"),
                    sizes: [192, 512],
                    type: "image/png",
                    destination: "static/icons",
                },
            ],
        },
    },
    [PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD],
];
module.exports = withConfig(
    withPlugins(
        [
            [withCSS],
            [withSass],
            [withBundleAnalyzer],
            withPwaManifest,
            withOffline,
        ],
        nextConfig
    )
);

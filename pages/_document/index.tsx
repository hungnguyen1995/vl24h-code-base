// #region Global Imports
import * as React from "react";
import Document, {
    Html,
    Head,
    Main,
    NextScript,
    DocumentContext,
} from "next/document";
import { ServerStyleSheet } from "styled-components";
import getConfig from "next/config";

// #endregion Global Imports
const { publicRuntimeConfig } = getConfig();
const fullAssetPath = "/_next/static";

class WebAppDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: App => props =>
                        sheet.collectStyles(<App {...props} />),
                });

            const initialProps = await Document.getInitialProps(ctx);
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                ),
            };
        } finally {
            sheet.seal();
        }
    }

    private static renderOGTags() {
        return (
            <>
                <meta
                    property="og:site_name"
                    content={publicRuntimeConfig.name}
                />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="static/images/logo.png" />
                <meta property="og:url" content="/" />
            </>
        );
    }

    // https://github.com/gokulkrishh/awesome-meta-and-manifest
    // eslint-disable-next-line class-methods-use-this
    private static renderPwaTags() {
        return (
            <>
                <link rel="manifest" href={`${fullAssetPath}/manifest.json`} />
                {/* iOS */}
                <meta
                    name="apple-mobile-web-app-title"
                    content={publicRuntimeConfig.NAME_APP}
                />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta
                    name="apple-mobile-web-app-status-bar-style"
                    content="black"
                />
                {/* Android */}
                <meta
                    name="theme-color"
                    content={publicRuntimeConfig.THEME_COLOR}
                />
                <meta name="mobile-web-app-capable" content="yes" />
                {/* Pinned Sites */}
                <meta
                    name="application-name"
                    content={publicRuntimeConfig.NAME_APP}
                />
                {/* UC Mobile Browser */}
                <meta name="full-screen" content="yes" />
                <meta name="browsermode" content="application" />
                {/* Others */}
                <meta name="layoutmode" content="fitscreen" />
                <meta name="imagemode" content="force" />
                <meta name="screen-orientation" content="portrait" />
            </>
        );
    }

    // https://github.com/gokulkrishh/awesome-meta-and-manifest#link-tags
    private static renderIconTags() {
        return (
            <>
                <link rel="shortcut icon" href="/static/images/favicon.png" />
                {/* iOS */}
                <link
                    rel="apple-touch-icon"
                    href={`${fullAssetPath}/icons/icon_180x180.png`}
                />
                {/* Startup Image */}
                <link
                    rel="apple-touch-startup-image"
                    sizes="1024x1024"
                    href={`${fullAssetPath}/icons/icon_1024x1024.png`}
                />
                {/* Android */}
                <link
                    rel="icon"
                    sizes="192x192"
                    href={`${fullAssetPath}/icons/icon_192x192.png`}
                />
            </>
        );
    }

    private static renderOtherTags() {
        return (
            <>
                <link rel="canonical" href="/" />
                <meta name="HandheldFriendly" content="True" />
                <meta name="google" content="notranslate" />
                <meta name="format-detection" content="telephone=no" />
            </>
        );
    }

    private static renderGTM() {
        return (
            <>
                <noscript
                    dangerouslySetInnerHTML={{
                        __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM_CODE"
        height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
                    }}
                />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.defer=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${publicRuntimeConfig.gtmCode}');`,
                    }}
                />
            </>
        );
    }

    render() {
        return (
            <Html>
                <Head>
                    <meta charSet="utf-8" />
                    <meta
                        httpEquiv="Content-type"
                        content="text/html;charset=UTF-8"
                    />
                    <meta
                        name="viewport"
                        content="width=device-width,initial-scale=1,maximum-scale=2"
                    />
                    <meta
                        httpEquiv="X-UA-Compatible"
                        content="IE=edge,chrome=1"
                    />
                    {/* OG */}
                    {WebAppDocument.renderOGTags()}
                    {/* iOS & Android */}
                    {WebAppDocument.renderPwaTags()}
                    {/* Icons */}
                    {WebAppDocument.renderIconTags()}
                    {/* Other Tags */}
                    {WebAppDocument.renderOtherTags()}
                    {/* GTM */}
                    {WebAppDocument.renderGTM()}
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default WebAppDocument;

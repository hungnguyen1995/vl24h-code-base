import * as React from "react";
import App, { AppInitialProps, AppContext } from "next/app";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import withRedux from "next-redux-wrapper";
import { theme } from "@Definitions/Styled";
import { appWithTranslation } from "@Server/i18n";
import { AppWithStore } from "@Interfaces";
import { makeStore } from "@Redux";
import { Toasty, MainLayout } from "@Components";

import "@Static/css/reset.scss";
// #endregion Local Imports

class WebApp extends App<any, AppWithStore> {
    static async getInitialProps({
        Component,
        ctx,
    }: AppContext): Promise<AppInitialProps> {
        const pageProps = Component.getInitialProps
            ? await Component.getInitialProps(ctx)
            : {};

        return { pageProps };
    }

    render() {
        const { Component, pageProps, store } = this.props;
        const getLayout =
            Component.getLayout ||
            ((page: any) => <MainLayout>{page}</MainLayout>);
        const ComponentLayout = () => {
            return getLayout(<Component {...pageProps} />);
        };
        return (
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <Toasty />
                    <ComponentLayout />
                </ThemeProvider>
            </Provider>
        );
    }
}

export default withRedux(makeStore)(appWithTranslation(WebApp));

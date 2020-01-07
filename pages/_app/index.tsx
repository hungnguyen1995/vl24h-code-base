import * as React from "react";
import App, { AppInitialProps, AppContext } from "next/app";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import withRedux from "next-redux-wrapper";
import { theme } from "@Definitions/Styled";
import { appWithTranslation } from "@Server/i18n";
import { AppWithStore } from "@Interfaces";
import { makeStore } from "@Redux";
import { Toasty, MainLayout, Modal } from "@Components";
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

    private static GetLayout(Component, pageProps) {
        const getLayout =
            Component.getLayout || (page => <MainLayout>{page}</MainLayout>);
        return getLayout(<Component {...pageProps} />);
    }

    render() {
        const { Component, pageProps, store } = this.props;

        return (
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <Toasty />
                    <Modal />
                    {WebApp.GetLayout(Component, pageProps)}
                </ThemeProvider>
            </Provider>
        );
    }
}

export default withRedux(makeStore)(appWithTranslation(WebApp));

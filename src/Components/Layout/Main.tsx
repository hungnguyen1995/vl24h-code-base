import * as React from "react";
import NextHead from "next/head";
import { Navbar } from "@Components";

export interface LayoutProps {
    children?: any;
}
const MainLayout: React.FunctionComponent<LayoutProps> = ({ children }) => {
    const {
        props: { meta },
    } = children;
    const metaTag = meta || children?.props?.children?.props?.meta;
    return (
        <div className="bg-white antialiased">
            <NextHead>
                <title>{metaTag?.title}</title>
            </NextHead>
            <Navbar metaTag={metaTag} />
            <div className="sm:mt-0">{children}</div>
        </div>
    );
};

export { MainLayout };

import * as React from "react";
import Link from "next/link";
import NextHead from "next/head";

export interface LayoutProps {
    children?: any;
}
const MainLayout: React.FunctionComponent<LayoutProps> = ({ children }) => {
    console.log("render", "giá trị: render")
    return (
        <div className="bg-white antialiased">
            <NextHead>
                <title>Home | CodeBase</title>
            </NextHead>
            <div>
                <div>
                    <div className="max-w-xl mx-auto px-8">
                        <nav>
                            <div className="py-4 flex-shrink-0 flex items-center">
                                <img
                                    className="h-8 w-8"
                                    src="/static/images/favicon.png"
                                    alt=""
                                />
                                <Link href="/">
                                    <a className="ml-8 font-medium text-gray-900">
                                        Home
                                    </a>
                                </Link>
                                <Link href="/profile">
                                    <a className="ml-8 font-medium text-gray-900">
                                        Account Settings
                                    </a>
                                </Link>
                                <Link href="/home">
                                    <a className="ml-8 font-medium text-gray-900">
                                        Test Api Demo
                                    </a>
                                </Link>
                            </div>
                            <div className="mt-2">
                                <input
                                    className="block w-full border border-gray-300 rounded-lg bg-gray-100 px-3 py-2 leading-tight focus:outline-none focus:border-gray-600 focus:bg-white"
                                    placeholder="Search..."
                                />
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="mt-6 sm:mt-0 sm:py-12">{children}</div>
        </div>
    );
};

export { MainLayout };

import * as React from "react";
import Link from "next/link";
import { INavbar } from "./Navbar";

const Navbar: React.FunctionComponent<INavbar.IProps> = ({
    metaTag,
}): JSX.Element => {
    return (
        <div>
            <div
                style={{
                    backgroundColor: metaTag?.background || "#ffffff",
                    padding: 20,
                }}
            >
                <div className="max-w-xl mx-auto px-8">
                    <nav>
                        <div className="py-4 flex-shrink-0 flex items-center">
                            <img
                                className="h-8 w-8"
                                src="/static/images/favicon.png"
                                alt=""
                            />
                            <Link href="/">
                                <a className="ml-2 font-medium text-white">
                                    Home
                                </a>
                            </Link>
                            <Link href="/form">
                                <a className="ml-2 font-medium text-white">
                                    Form Hooks+Bootstrap
                                </a>
                            </Link>
                            <Link href="/profile">
                                <a className="ml-2 font-medium text-white">
                                    TailwinCss
                                </a>
                            </Link>
                            <Link href="/home">
                                <a className="ml-2 font-medium text-white">
                                    Test Api Demo
                                </a>
                            </Link>
                        </div>
                        <div className="mt-2">
                            <input
                                className="block w-full border border-gray-300 rounded-lg bg-gray-100 px-3 py-2 leading-tight focus:outline-none focus:border-gray-600 focus:bg-white"
                                placeholder="Nhập input và chuyển Page không bị re-Render"
                            />
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export { Navbar };

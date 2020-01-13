import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export interface LayoutProps {
    children?: any;
}
// @ts-ignore
const ActiveLink = ({ children, href, className }) => {
    const router = useRouter();
    return (
        <li className={className}>
            <Link href={href} scroll={false}>
                <a
                    className={`${
                        router.pathname === href
                            ? "nav-link active"
                            : "nav-link"
                    }`}
                >
                    {children}
                </a>
            </Link>
        </li>
    );
};

const FormLayout: React.FunctionComponent<LayoutProps> = ({ children }) => {
    return (
        <div className="max-w-2xl mx-auto px-8 py-5">
            <ul className="nav nav-tabs">
                <ActiveLink href="/form" className="nav-item">
                    Simple
                </ActiveLink>
                <ActiveLink href="/form/billing" className="nav-item">
                    Simple 2
                </ActiveLink>
                <ActiveLink href="/form/simple3" className="nav-item">
                    Simple3
                </ActiveLink>
            </ul>
            <div className="p-3">{children}</div>
        </div>
    );
};

export { FormLayout };

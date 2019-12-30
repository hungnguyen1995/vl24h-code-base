import React from "react";
import Link from "next/link";
import { ReduxNextPageContext } from "@Interfaces";
import { withLayout } from "@Components/Hocs";

const Index = () => (
    <div className="mt-8 max-w-xl mx-auto px-8">
        <h1 className="text-center">
            <span className="block text-xl text-gray-600 leading-tight">
                Welcome to Code Base - SV
            </span>
            <span className="block text-5xl font-bold leading-none">
                Xin Chào !!
            </span>
        </h1>
        <div className="mt-12 text-center">
            <Link href="/home">
                <a className="inline-block bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg px-6 py-4 leading-tight">
                    Fetch Api
                </a>
            </Link>
        </div>
    </div>
);

Index.getInitialProps = async (ctx: ReduxNextPageContext): Promise<any> => {
    return { namespacesRequired: ["common"], data: {} };
};

Index.getLayout = withLayout;

export default Index;

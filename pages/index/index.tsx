import React from "react";
import Link from "next/link";
import { ReduxNextPageContext } from "@Interfaces";
import { withLayout } from "@Components/Hocs";
import { useDispatch } from "react-redux";
import { showModal } from "@Actions";
import { TestForm, TestButton } from "@Components";

const Index = () => {
    const dispatch = useDispatch();
    const openModal = () => {
        dispatch(showModal({ title: "123", Component: TestForm }));
    };

    return (
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
            <div className="mt-12 text-center">
                <button
                    onClick={openModal}
                    type="button"
                    className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                >
                    Modal
                </button>
            </div>
            <div className="mt-12 text-center">
                <TestButton />
            </div>
        </div>
    );
};

Index.getInitialProps = async (): Promise<any> => {
    const meta = {
        title: "Trang Chủ",
        description: "Trang chủ",
        background: "#4a1a67",
    };
    return { namespacesRequired: ["common"], data: {}, meta };
};

Index.getLayout = withLayout;

export default Index;

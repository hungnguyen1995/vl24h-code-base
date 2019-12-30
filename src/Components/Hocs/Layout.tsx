import React from "react";
import { MainLayout, AccountLayout } from "@Components";
// @ts-ignore
export const withLayout = (Component): any => (
    <MainLayout>{Component}</MainLayout>
);

export const withAccountLayout = (Component: any): any =>
    withLayout(<AccountLayout>{Component}</AccountLayout>);

import React from "react";
import { MainLayout, AccountLayout, FormLayout } from "@Components";
// @ts-ignore
export const withLayout = (Component): any => (
    <MainLayout>{Component}</MainLayout>
);

export const withAccountLayout = (Component: any): any =>
    withLayout(<AccountLayout>{Component}</AccountLayout>);

export const withFormLayout = (Component: any): any =>
    withLayout(<FormLayout>{Component}</FormLayout>);

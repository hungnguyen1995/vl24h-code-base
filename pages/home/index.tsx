import React, { useCallback, useMemo } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { bindActionCreators } from "redux";
import { withTranslation } from "@Server/i18n";
import {
    Container,
    Top,
    TopText,
    Middle,
    MiddleLeft,
    MiddleLeftButtons,
    MiddleRight,
    Apod,
    ApodButton,
} from "@Styled/Home";
import { IStore } from "@Redux/IStore";
import {
    requestApi,
    requestApiAsync,
    requestResetApi,
    putSuccess,
    putErrors,
} from "@Actions";
import { Auth, Fe } from "@Api";
import { Heading, LocaleButton, withLayout } from "@Components";
import { KeyConst } from "@Definitions";
import { ReduxNextPageContext } from "@Interfaces";

const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1Nzc0MTM4NDAsImV4cCI6MTU3NzQ1NzA0MCwidXVpZCI6IlZvbGVqUmVqTm0iLCJpc3MiOiJodHRwOlwvXC9waGFud2ViLmxvY2FsaG9zdFwvIn0.MtOwkbc6OWOALPqreBYHjbywzjTYxj5hbC9UlwLpxQM";

const Home: any = ({ t, i18n }) => {
    const dispatch = useDispatch();
    const actions = useMemo(
        () =>
            bindActionCreators(
                {
                    requestApi,
                    requestApiAsync,
                    putSuccess,
                    putErrors,
                    requestResetApi,
                },
                dispatch
            ),
        [dispatch]
    );
    const resAuth = useSelector(
        (state: IStore) => state.api[KeyConst.HomeAuth],
        shallowEqual
    );
    const resCommon = useSelector(
        (state: IStore) => state.api[KeyConst.HomeCommon],
        shallowEqual
    );
    // eslint-disable-next-line no-console
    const dataUser = resAuth?.code === 200 ? resAuth.data : {};
    // eslint-disable-next-line no-console
    console.log(dataUser, "giá trị: dataUser");
    const dataCommon = resCommon?.code === 200 ? resCommon.data : {};
    const getInfo = useCallback(() => {
        actions.requestApi(Auth.getInfo, KeyConst.HomeAuth, token);
    }, [actions]);
    const getInit = useCallback(() => {
        actions.requestApi(Fe.getCommon, KeyConst.HomeCommon, {});
    }, [actions]);
    const clickPopup = useCallback(() => {
        actions.putSuccess("Thành Công");
    }, [actions]);
    const clickPopupErors = useCallback(() => {
        actions.putErrors("Lỗi");
    }, [actions]);
    const getAsync = useCallback(() => {
        actions.requestApiAsync(
            [Fe.getCommon, Auth.getInfo],
            [KeyConst.HomeCommon, KeyConst.HomeAuth],
            KeyConst.HomeInitAsync,
            [{ token }, {}]
        );
    }, [actions]);
    const resetApi = useCallback(() => {
        actions.requestResetApi();
    }, [actions]);

    const renderLocaleButtons = (activeLanguage: string) =>
        ["vi", "es", "tr"].map(lang => (
            <LocaleButton
                key={lang}
                lang={lang}
                isActive={activeLanguage === lang}
                onClick={() => i18n.changeLanguage(lang)}
            />
        ));

    return (
        <Container>
            <Top>
                <img src="/static/images/pankod-logo.png" alt="Pankod Logo" />
            </Top>
            <Middle>
                <Apod>
                    <ApodButton onClick={getInit}>Api Single Init</ApodButton>
                    <ApodButton onClick={getInfo}>
                        Api Single getInfo
                    </ApodButton>
                    <ApodButton onClick={getAsync}>
                        Api Multi Promise All
                    </ApodButton>
                    <ApodButton onClick={resetApi}>Reset API</ApodButton>
                </Apod>
                <MiddleLeft>
                    <MiddleLeftButtons>
                        {renderLocaleButtons(i18n.language)}
                    </MiddleLeftButtons>
                </MiddleLeft>
                <MiddleRight>
                    <TopText>{t("common:Hello")}</TopText>
                    <Heading text={t("common:World")} />
                </MiddleRight>
            </Middle>
            <h2>DataUser</h2>
            <br />
            <code>{`${JSON.stringify(dataUser)}`}</code>
            <br />
            <br />
            <h2>dataCommon</h2>
            <br />
            <br />
            <code>{`${JSON.stringify(dataCommon)}`}</code>
        </Container>
    );
};

Home.getInitialProps = async (): Promise<any> => {
    const meta = {
        title: "Trang Chủ",
        description: "Trang chủ",
        background: "#00999f",
    };
    return { namespacesRequired: ["common"], data: {}, meta };
};

Home.getLayout = withLayout;
const Extended = withTranslation("common")(Home);

export default Extended;

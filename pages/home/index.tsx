// #region Global Imports
import React, { useEffect } from "react";
import { NextPage } from "next";
import { useSelector, useDispatch } from "react-redux";
// #endregion Global Imports

// #region Local Imports
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
import { Request } from "@Actions";
import { Auth, Fe } from "@Api";
// eslint-disable-next-line import/named
import { Heading, LocaleButton } from "@Components";
// #endregion Local Imports

// #region Interface Imports
import { IHomePage, ReduxNextPageContext } from "@Interfaces";
// #endregion Interface Imports
const ApiKey = "AuthKey";
const ApiCommon = "ApiCommon";

const Home: NextPage<IHomePage.IProps, IHomePage.InitialProps> = ({
    t,
    i18n,
}) => {
    const res = useSelector((state: IStore) => state.api);
    const dataUser = res[ApiKey]?.code === 200 ? res[ApiKey].data : {};
    const dataCommon = res[ApiCommon]?.code === 200 ? res[ApiCommon].data : {};
    console.log(res, "giá trị: res")
    console.log(dataUser, dataCommon);
    // eslint-disable-next-line no-console
    const dispatch = useDispatch();
    const getData = React.useCallback(() => {
        dispatch(
            Request.Api(
                Auth.getInfo,
                ApiKey,
                "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1Nzc0MTM4NDAsImV4cCI6MTU3NzQ1NzA0MCwidXVpZCI6IlZvbGVqUmVqTm0iLCJpc3MiOiJodHRwOlwvXC9waGFud2ViLmxvY2FsaG9zdFwvIn0.MtOwkbc6OWOALPqreBYHjbywzjTYxj5hbC9UlwLpxQM"
            )
        );
    }, [dispatch]);

    const getInit = React.useCallback(() => {
        dispatch(Request.Api(Fe.getCommon, ApiCommon, {}));
    }, [dispatch]);

    useEffect(() => {
        getInit();
    }, [getInit]);

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
                    <ApodButton onClick={getData}>Lấy Info User</ApodButton>
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
            <code>{`${JSON.stringify(dataUser)}`}</code>
            <br />
            <br />
            <br />
            <br />
            <code>{`${JSON.stringify(dataCommon)}`}</code>
        </Container>
    );
};

Home.getInitialProps = async (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ctx: ReduxNextPageContext
): Promise<IHomePage.InitialProps> => {
    await ctx.store.dispatch(
        Request.Api(
            Auth.getInfo,
            ApiKey,
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1NzczNTM5MjksImV4cCI6MTU3NzM5NzEyOSwidXVpZCI6IlZvbGVqUmVqTm0iLCJpc3MiOiJodHRwOlwvXC9waGFud2ViLmxvY2FsaG9zdFwvIn0.eiSE0slwUN30weB-v-G8a_abcoKorCvTte5vQylwxlM"
        )
    );
    const res = ctx.store.getState().api[ApiKey];
    const data = res?.code === 200 ? res.data : {};
    console.log(data, "giá trị: data");
    return { namespacesRequired: ["common"] };
};

const Extended = withTranslation("common")(Home);

export default Extended;

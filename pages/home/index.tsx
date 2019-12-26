// #region Global Imports
import * as React from "react";
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
import { Auth } from "@Api";
// eslint-disable-next-line import/named
import { Heading, LocaleButton } from "@Components";
// #endregion Local Imports

// #region Interface Imports
import { IHomePage, ReduxNextPageContext } from "@Interfaces";
// #endregion Interface Imports
const ApiKey = "AuthKey";
const Home: NextPage<IHomePage.IProps, IHomePage.InitialProps> = ({
    t,
    i18n,
}) => {
    const data = useSelector((state: IStore) => state.api);
    const dispatch = useDispatch();
    const getData = React.useCallback(() => {
        dispatch(
            Request.Api(
                Auth.getInfo,
                ApiKey,
                "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1NzczNTM5MjksImV4cCI6MTU3NzM5NzEyOSwidXVpZCI6IlZvbGVqUmVqTm0iLCJpc3MiOiJodHRwOlwvXC9waGFud2ViLmxvY2FsaG9zdFwvIn0.eiSE0slwUN30weB-v-G8a_abcoKorCvTte5vQylwxlM"
            )
        );
    }, [dispatch]);
    const renderLocaleButtons = (activeLanguage: string) =>
        ["en", "es", "tr"].map(lang => (
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
                    <ApodButton onClick={getData}>Discover Space</ApodButton>
                </Apod>
                <MiddleLeft>
                    <MiddleLeftButtons>
                        {renderLocaleButtons(i18n.language)}
                    </MiddleLeftButtons>
                </MiddleLeft>
                <MiddleRight>
                    <TopText>{t("common:Hello")}</TopText>
                    <Heading text={t("common:World")} />
                    <code>{`${JSON.stringify(data)}`}</code>
                </MiddleRight>
            </Middle>
        </Container>
    );
};

Home.getInitialProps = async (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ctx: ReduxNextPageContext
): Promise<IHomePage.InitialProps> => {
    return { namespacesRequired: ["common"] };
};

const Extended = withTranslation("common")(Home);

export default Extended;

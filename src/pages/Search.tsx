import { Box, Chip, Container, Divider, Grid2 as Grid, Stack, Typography } from "@mui/material";
import ROUTES from "../routes";
import AppCard from "../components/AppCard";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { longestCommonSubstring } from "../features/Text";


export default function Search() {
    const { t } = useTranslation();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const text = params.get("text")??"";
    const keywords = Array.from(new Set(text.toLowerCase().split(/[,，;；\s]+/)));
    const navigate = useNavigate();

    // SEO
    useEffect(() => {
        document.title = `${t("title")} - ${t("pages.search")}`;
        document.querySelector('meta[name="description"]')?.setAttribute("content", t("description.base"));
    }, [t]);

    if (text.trim() === "") {
        navigate({
            pathname: "/",
        });
    }

    const routes: (typeof ROUTES) = [];
    for (const CATEGORY of ROUTES) {
        const category: (typeof CATEGORY) = {
            name: CATEGORY.name,
            apps: [],
        };

        for (const app of CATEGORY.apps) {
            KEYWORD: for (const keyword of keywords) {
                for (const appKeyword of app.keywords ?? []) {
                    console.log(keyword, appKeyword, longestCommonSubstring(keyword, appKeyword).length / keyword.length);
                    if (appKeyword.includes(keyword) || keyword.includes(appKeyword) || (longestCommonSubstring(keyword, appKeyword).length / appKeyword.length) > 0.75) {
                        category.apps.push(app);
                        break KEYWORD;
                    }
                }
            }
        }

        if (category.apps.length > 0) {
            routes.push(category);
        }
    }

    return (
        <Container maxWidth="xl" sx={{marginY:2}}>
            <Stack spacing={2}>
                <Typography variant="overline">{t("search.keywords")}</Typography>
                <Box display={'flex'} gap={1} flexWrap={'wrap'}>
                {
                    keywords.map((keyword, index) => {
                        return <Chip key={index} label={keyword} onDelete={() => {
                            const words = [...keywords];
                            words.splice(index, 1);
                            const text = words.join(",");
                            navigate({
                                pathname: "/search",
                                search: `?text=${text}`
                            });
                        }}/>
                    })
                }
                </Box>
                {
                    routes.map((category, index) => {
                        return (
                            <Stack key={index} spacing={2}>
                                <Typography variant="h5">
                                    {t(category.name)}
                                </Typography>
                                <Grid container spacing={2}>
                                    {
                                        category.apps.map((app, index) => {
                                            return (
                                                <Grid size={{xs:12, md: 6, lg: 3}} key={index}>
                                                    <AppCard icon={app.icon} name={t(app.name)} desc={t(app.desc)} url={app.url} key={index}/>
                                                </Grid>
                                            )
                                        })
                                    }
                                </Grid>
                                {index + 1 < routes.length && <Box py={2}><Divider/></Box>}
                            </Stack>
                        ) 
                    })
                }
            </Stack>
        </Container>
    )
}
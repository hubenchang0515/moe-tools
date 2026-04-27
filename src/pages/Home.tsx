import { Box, Container, Divider, Grid2 as Grid, Stack, Typography, useTheme } from "@mui/material";
import ROUTES from "../routes";
import AppCard from "../components/AppCard";
import { useTranslation } from "react-i18next";
import Markdown from "../components/Markdown";
import { useEffect } from "react";
import home from "../assets/markdown/home.md?raw";

export default function Home() {
    const { t } = useTranslation();
    const theme = useTheme();
    
    // SEO
    useEffect(() => {
        document.title = `${t("title")} - ${t("pages.home")}`;
        document.querySelector('meta[name="description"]')?.setAttribute("content", t("description.base"));
    }, [t]);

    return (
        <Container maxWidth="xl" sx={{py:2}}>
            <Stack spacing={2}>
                <Markdown text={home}/>
                {
                    ROUTES.map((category, index) => {
                        return (
                            <Stack key={index} spacing={2}>
                                <Typography variant="h5" color={theme.palette.primary.main}>
                                    {t(category.name)}
                                </Typography>
                                <Grid container spacing={2}>
                                    {
                                        category.apps.map((app, index) => {
                                            return (
                                                <Grid size={{xs:12, md: 6, lg: 3}} key={index}>
                                                    <AppCard 
                                                        icon={app.icon}
                                                        name={t(app.name)} 
                                                        desc={t(app.desc)}
                                                        url={app.url} 
                                                        key={index}
                                                    />
                                                </Grid>
                                            )
                                        })
                                    }
                                </Grid>
                                {index + 1 < ROUTES.length && <Box py={2}><Divider/></Box>}
                            </Stack>
                        ) 
                    })
                }
            </Stack>
        </Container>
    )
}
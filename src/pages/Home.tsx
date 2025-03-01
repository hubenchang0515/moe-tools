import { Container, Divider, Grid2 as Grid, Stack, Typography } from "@mui/material";
import ROUTES from "../routes";
import AppCard from "../components/AppCard";
import { useTranslation } from "react-i18next";
import Markdown from "../components/Markdown";
import { useEffect } from "react";
import home from "../assets/markdown/home.md?raw";

export default function Home() {
    const { t } = useTranslation();
    
    // SEO
    useEffect(() => {
        document.title = `${t("title")} - ${t("pages.home")}`;
        document.querySelector('meta[name="description"]')?.setAttribute("content", t("description.base"));
    }, [t]);

    let i = 0;
    return (
        <Container maxWidth="xl" sx={{marginY:2}}>
            <Stack spacing={2}>
                <Markdown text={home}/>
                {
                    ROUTES.map((category, index) => {
                        return (
                            <Stack key={index} spacing={2}>
                                <Typography variant="h6">
                                    {t(category.name)}
                                </Typography>
                                <Divider/>
                                <Grid container spacing={2}>
                                    {
                                        category.apps.map((app, index) => {
                                            return (
                                                <Grid size={{xs:12, md: 6, lg: 3}} key={index}>
                                                    <AppCard 
                                                        name={t(app.name)} 
                                                        url={app.url} 
                                                        key={index} 
                                                        image={`https://www.dmoe.cc/random.php?key=${i++}`}
                                                    />
                                                </Grid>
                                            )
                                        })
                                    }
                                </Grid>
                            </Stack>
                        ) 
                    })
                }
                <Grid size={{xs:12, md: 6, lg: 3}} style={{visibility:'hidden'}}>
                    <AppCard name="" url="" image=""/>
                </Grid>
            </Stack>
        </Container>
    )
}
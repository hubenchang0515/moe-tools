import { Chip, Container, Divider, Grid2 as Grid, Stack, Typography } from "@mui/material";
import ROUTES from "../routes";
import AppCard from "../components/AppCard";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";


export default function Home() {
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

    const routes: (typeof ROUTES) = [];
    for (const CATEGORY of ROUTES) {
        const category: (typeof CATEGORY) = {
            name: CATEGORY.name,
            apps: [],
        };

        for (const app of CATEGORY.apps) {
            for (const keyword of keywords) {
                if (app.keywords?.includes(keyword)) {
                    category.apps.push(app);
                    break;
                }
            }
        }

        if (category.apps.length > 0) {
            routes.push(category);
        }
    }

    let i = 0;
    return (
        <Container maxWidth="xl" sx={{marginY:2}}>
            <Stack spacing={2}>
                <Typography variant="overline">{t("search.keywords")}</Typography>
                <Stack direction={'row'} spacing={2} sx={{ flexWrap: 'wrap' }}>
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
                </Stack>
                {
                    routes.map((category, index) => {
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
                                                    <AppCard name={t(app.name)} url={app.url} key={index} image={`https://www.dmoe.cc/random.php?key=${i++}`}/>
                                                </Grid>
                                            )
                                        })
                                    }
                                </Grid>
                            </Stack>
                        ) 
                    })
                }
            </Stack>
        </Container>
    )
}
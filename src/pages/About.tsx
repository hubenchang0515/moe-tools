import { Container } from "@mui/material";
import Markdown from "../components/Markdown";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function About() {
    const { t } = useTranslation();

    // SEO
    useEffect(() => {
        document.title = `${t("title")} - ${t("pages.about")}`;
        document.querySelector('meta[name="description"]')?.setAttribute("content", t("description.base"));
    }, [t]);
    
    return (
        <Container maxWidth="xl">
            <Markdown url="markdown/about.md"/>
        </Container>
    )
}
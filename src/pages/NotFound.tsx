import { Container, Link, Typography } from "@mui/material";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { Link as RLink } from "react-router-dom";

export default function NotFound() {
    const location = useLocation();
    const { t } = useTranslation();

    // SEO
    useEffect(() => {
        document.title = `${t("title")} - ${t("pages.not-found")}`;
        document.querySelector('meta[name="description"]')?.setAttribute("content", t("description.base"));
    }, [t]);
    
    return (
        <Container maxWidth="xl" sx={{height: '100%', overflow:'hidden', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
            <Typography variant="h1" sx={{textAlign:'center', fontSize: {xs:'2rem', sm:'2rem', md:'4rem', lg:'4rem', xl:'4rem'}}}>
                404 Not Found
            </Typography>
            <Typography variant="caption" sx={{textAlign:'center'}}>
                Location Path: <span style={{textDecoration:'underline'}}>{decodeURI(location.pathname + location.search)}</span>
            </Typography>
            <Typography variant="overline" sx={{textAlign:'center'}}>
                Back To <Link to="/" component={RLink}>Home</Link>
            </Typography>
        </Container>
    )
}
import { Container, Link, Typography } from "@mui/material";
import { useHref, useLocation } from "react-router-dom";

export default function NotFound() {
    const location = useLocation();
    
    return (
        <Container maxWidth="xl" sx={{height: '100%', overflow:'hidden', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
            <Typography variant="h1" sx={{textAlign:'center', fontSize: {xs:'2rem', sm:'2rem', md:'4rem', lg:'4rem', xl:'4rem'}}}>
                404 Not Found
            </Typography>
            <Typography variant="caption" sx={{textAlign:'center'}}>
                Location Path: <span style={{textDecoration:'underline'}}>{decodeURI(location.pathname + location.search)}</span>
            </Typography>
            <Typography variant="overline" sx={{textAlign:'center'}}>
                Back To <Link href={useHref("/")}>Home</Link>
            </Typography>
        </Container>
    )
}
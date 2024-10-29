import { Container } from "@mui/material";
import Markdown from "../components/Markdown";


export default function Home() {
    return (
        <Container maxWidth="xl">
            <Markdown url="markdown/home.md"/>
        </Container>
    )
}
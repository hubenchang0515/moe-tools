import { Container } from "@mui/material";
import Markdown from "../components/Markdown";

export default function About() {
    return (
        <Container maxWidth="xl">
            <Markdown url="markdown/about.md"/>
        </Container>
    )
}
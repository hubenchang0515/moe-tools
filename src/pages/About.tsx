import { Container } from "@mui/material";
import Markdown from "../components/Markdown";

export default function About() {
    return (
        <Container maxWidth="xl">
            <Markdown url="https://raw.githubusercontent.com/hubenchang0515/moe-tools/refs/heads/master/README.md"/>
        </Container>
    )
}
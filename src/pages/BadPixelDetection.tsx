import { Alert, Box, Button, Container } from "@mui/material";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import Canvas from "../components/Canvas";

export default function BadPixelDetection() {
    const { t } = useTranslation();
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // SEO
    useEffect(() => {
        document.title = `${t("title")} - ${t("pages.bad-pixel-detection")}`;
        document.querySelector('meta[name="description"]')?.setAttribute("content", t("description.bad-pixel-detection"));
    }, [t]);

    const init = () => {
        let index = 0;
        const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', "#FFFFFF", "#000000"];

        const onLoad = () => {
            index = 0;
        }

        const onDraw = (canvas:HTMLCanvasElement) => {
            const ctx = canvas.getContext("2d");
            if (ctx) {
                ctx.fillStyle = colors[index];
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }
        }

        const onUpdate = () => {

        }

        const onInput = () => {
            index = (index + 1) % colors.length; 
        }

        return {onLoad, onDraw, onUpdate, onInput};
    }

    const {onLoad, onDraw, onUpdate, onInput} = init();

    return (
        <Container maxWidth="xl" sx={{py: 2, height: '100%'}}>
            <Box height={'100%'} display={'flex'} flexDirection={'column'} gap={2}>
                <Box flexGrow={1}>
                    <Canvas ref={canvasRef} onLoad={onLoad} onDraw={onDraw} onUpdate={onUpdate} onClick={onInput} onKeyDown={onInput}/>
                </Box>
                <Button variant="contained" onClick={() => {canvasRef.current?.requestFullscreen(); }}>开始检测</Button>
                <Alert severity="info">{t("bad-pixel-detection.message")}</Alert>
            </Box>
        </Container>
    )
}
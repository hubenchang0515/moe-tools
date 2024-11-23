import { Alert, AlertTitle, Box, Button, Chip, Container, IconButton } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Canvas from "../components/Canvas";
import HelpIcon from '@mui/icons-material/Help';

export default function FrameRateDetection() {
    const { t } = useTranslation();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    
    // const index = useRef(0);
    
    // SEO
    useEffect(() => {
        document.title = `${t("title")} - ${t("pages.frame-rate-detection")}`;
        document.querySelector('meta[name="description"]')?.setAttribute("content", t("description.frame-rate-detection"));
    }, [t]);

    const init = () => {
        let index = 0;
        const rows = 24;
        const cols = 24;

        const draw = (canvas:HTMLCanvasElement) => {
            if (!canvas) {
                return;
            }
            const ctx = canvas.getContext("2d");
            if (ctx) {
                ctx.fillStyle = '#000000';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                ctx.strokeStyle = '#FFFFFF';
                ctx.beginPath();
                for (let i = 1; i < cols; i++) {
                    ctx.moveTo(canvas.width * i / cols, 0);
                    ctx.lineTo(canvas.width * i / cols, canvas.height);
                }

                for (let i = 1; i < rows; i++) {
                    ctx.moveTo(0, canvas.height * i / rows);
                    ctx.lineTo(canvas.width, canvas.height * i / rows);
                }
                ctx.stroke();

                ctx.fillStyle = '#FFFFFF';
                const row = Math.floor(index / cols);
                const col = index % cols;
                ctx.fillRect(canvas.width * col / cols, canvas.height * row / rows, canvas.width / cols, canvas.height / rows);
                
            }
        }

        const update = () => {
            index = (index + 1) % (rows * cols);
        }

        return {draw, update};
    }

    const {draw, update} = init();
    const onDraw = useCallback(draw, []);
    const onUate = useCallback(update, []);

    const [fps, setFps] = useState(0);
    const [hz, setHz] = useState(0);
    useEffect(() => {
        let fpsPrevTime:DOMHighResTimeStamp = 0;
        let fpsframes = 0;

        let hzPrevTime:DOMHighResTimeStamp = 0;
        let hzframes = 0;
        let hzTime = 0;

        const frame = (t:DOMHighResTimeStamp) => {
            if (fpsPrevTime === 0) {
                fpsPrevTime = t;
            }

            if (hzPrevTime === 0) {
                hzPrevTime = t;
            }

            // Hz: 持续监测的刷新率
            const dt = t - hzPrevTime;
            hzPrevTime = t;
            if (dt > 0 && dt < 100) {
                // 超过 100 ms 视为异常数据，忽略
                hzframes += 1;
                hzTime += dt;
                const hz = hzframes * 1000 / hzTime;

                // 每秒刷新
                if (t - fpsPrevTime >= 1000) {
                    setHz(hz);
                }
            }

            // FPS: 近1秒的刷新率
            fpsframes += 1;
            if (t - fpsPrevTime >= 1000) {
                const fps = fpsframes * 1000 / (t - fpsPrevTime);
                fpsPrevTime = t;
                fpsframes = 0;
                setFps(fps);
            }
            
            window.requestAnimationFrame(frame);
        }
        
        frame(0);
    }, []);

    return (
        <Container maxWidth="xl" sx={{py: 2, height: '100%'}}>
            <Box height={'100%'} display={'flex'} flexDirection={'column'} gap={2}>
                <Box flexGrow={1}>
                    <Canvas ref={canvasRef} onDraw={onDraw} onUpdate={onUate}/>
                </Box>
                <Button variant="contained" onClick={() => {canvasRef.current?.requestFullscreen(); }}>{t("common.fullscreen")}</Button>
                <Box display={'flex'} gap={1} flexWrap={'wrap'} alignItems={'center'}>
                    <Chip label={`${t("frame-rate-detection.frame-rate")}: ${fps.toFixed(2)} fps`} color="primary" />
                    <Chip label={`${t("frame-rate-detection.refresh-rate")}: ${hz.toFixed(2)} Hz`} color="primary" />
                    <IconButton href="https://www.vsynctester.com/manual.html" target="_blank">
                        <HelpIcon/>
                    </IconButton>
                </Box>
                <Alert severity="info">
                    <AlertTitle><strong>{t("common.explain")}</strong></AlertTitle>
                    {t("frame-rate-detection.message")}
                </Alert>
            </Box>
        </Container>
    )
}
import { useEffect, useState } from "react";
import Frame from "../components/Frame";
import { Box, Button } from "@mui/material";
import FabMessage from "../components/FabMessage";
import { useTranslation } from "react-i18next";

export interface FramePageProps {
    url: string;
    title: string;
    description: string;
}

export default function FramePage(props: FramePageProps) {
    const { t } = useTranslation();

    // 同源检查,设置警示信息：告知跨域时 iframe 会有一些限制，建议访问源页面
    const url = new URL(props.url);
    const crossOrigin = window.location.origin !== url.origin;
    const [messageOpen, setMessageOpen] = useState<boolean>(false);

    // SEO
    useEffect(() => {
        document.title = `${t("title")} - ${t(props.title)}`;
        document.querySelector('meta[name="description"]')?.setAttribute("content", t(props.description));
    }, [t, props.title, props.description]);

    return (
        <Box sx={{width: '100%', height: '100%', position:'relative', }}>
            <Frame url={props.url}>
            <FabMessage 
                open={messageOpen} 
                title={t("common.notice")}
                content={t("frame.warning-message")}
                severity="warning" 
                variant="standard"
                onOpen={()=>setMessageOpen(true)} 
                fabSx={{display: crossOrigin?'display':'none', position:'absolute', top: 32, right:32, zIndex:10}}
            >
                <Box display="flex" gap={1} justifyContent='flex-end'>
                    <Button variant="contained" color="warning" href={url.toString()} target="_blank">{t("frame.go-to-source-page")}</Button>
                    <Button variant="text" color="inherit" onClick={()=>setMessageOpen(false)}>{t("common.close")}</Button>
                </Box>
            </FabMessage>
            </Frame>
        </Box>
    )
}
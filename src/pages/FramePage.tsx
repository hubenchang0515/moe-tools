import { useEffect, useState } from "react";
import Frame from "../components/Frame";
import { Box, Button } from "@mui/material";
import FabMessage from "../components/FabMessage";
import { useTranslation } from "react-i18next";

export interface FramePageProps {
    url: string;
}

export default function FramePage(props: FramePageProps) {
    const { t } = useTranslation();

    // 同源检查,设置警示信息：告知跨域时 iframe 会有一些限制，建议访问源页面
    const url = new URL(props.url);
    const severity = window.location.origin === url.origin ? "info" : "warning";
    const openImmediately = () => ["warning", "error"].includes(severity);
    const [messageOpen, setMessageOpen] = useState<boolean>(openImmediately());
    useEffect(()=>setMessageOpen(openImmediately()), [props.url, severity]);

    return (
        <Box sx={{width: '100%', height: '100%'}}>
            <Frame url={props.url}>
                <FabMessage 
                    open={messageOpen} 
                    title={t("common.notice")}
                    content={t("frame.warning-message")}
                    severity={severity} 
                    variant="standard"
                    onOpen={()=>setMessageOpen(true)} 
                    sx={{position:'absolute', left: 32, bottom: 32, zIndex:10}}
                >
                    <Box display="flex" gap={1} justifyContent='flex-end'>
                        <Button variant="contained" color={severity} href={url.toString()} target="_blank">{t("frame.go-to-source-page")}</Button>
                        <Button variant="text" color="inherit" onClick={()=>setMessageOpen(false)}>{t("common.close")}</Button>
                    </Box>
                </FabMessage>
            </Frame>
        </Box>
    )
}
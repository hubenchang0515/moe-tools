import { Box, Button } from "@mui/material";
import FabMessage, { FabMessageProps } from "./FabMessage";
import { useEffect, useRef, useState } from "react";
import { t } from "i18next";

export interface FrameProps {
    url: string;
    severity?: FabMessageProps['severity'];
}


export default function Frame(props:FrameProps) {
    const openImmediately = () => ["warning", "error"].includes(props.severity??"");
    const [messageOpen, setMessageOpen] = useState<boolean>(openImmediately());
    useEffect(()=>setMessageOpen(openImmediately()), [props.url, props.severity]);

    // 转发 iframe 的点击事件
    // 跨域时 iframe?.contentWindow?.document 会产生 SecurityError
    // 而 iframe?.contentDocument 会返回 undefined
    const divRef = useRef<HTMLDivElement>(null);
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [iframeBody, setIframeBody] = useState<HTMLElement>();
    useEffect(() => {
        if (iframeBody) {
            iframeBody.onclick = () => {
                divRef.current?.click();
            }
        }
    }, [iframeBody]);

    return (
        <Box sx={{width: '100%', height: '100%'}} ref={divRef}>
            <FabMessage 
                open={messageOpen} 
                title={t("common.notice")}
                content={t("frame.warning-message")}
                severity={props.severity} 
                variant="standard"
                onOpen={()=>setMessageOpen(true)} 
                sx={{position:'fixed', left: 32, bottom: 32, zIndex:10}}
            >
                <Box display="flex" gap={1} justifyContent='flex-end'>
                    <Button variant="contained" color={props.severity} href={props.url} target="_blank">{t("frame.go-to-source-page")}</Button>
                    <Button variant="text" color="inherit" onClick={()=>setMessageOpen(false)}>{t("common.close")}</Button>
                </Box>
            </FabMessage>
            <iframe
                src={props.url} 
                style={{display:'block', border: 0, width: '100%', height: '100%'}}
                ref={iframeRef}
                onLoad={()=>setIframeBody(iframeRef.current?.contentDocument?.body)}
            />
        </Box>
    )
}
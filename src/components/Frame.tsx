import { Box, useTheme } from "@mui/material";
import { useEffect, useRef, useState } from "react";
export interface FrameProps {
    url: string;
    children?: JSX.Element;
}


export default function Frame(props:FrameProps) {
    // 添加主题参数
    const url = new URL(props.url);
    const theme = useTheme();
    url.searchParams.set('theme', theme.palette.mode);

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
            <iframe
                src={url.toString()} 
                style={{display:'block', border: 0, width: '100%', height: '100%'}}
                ref={iframeRef}
                onLoad={()=>setIframeBody(iframeRef.current?.contentDocument?.body)}
            />
            {props.children}
        </Box>
    )
}
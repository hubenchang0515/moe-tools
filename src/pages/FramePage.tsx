import { useEffect, useState } from "react";
import Frame from "../components/Frame";
import { Box, Button } from "@mui/material";
import FabMessage, { FabMessageProps } from "../components/FabMessage";
import { useTranslation } from "react-i18next";

export interface FramePageProps {
    url: string;
    title: string;
    description: string;
    alert?: boolean;
    severity?: FabMessageProps['severity'];
}

export default function FramePage(props: FramePageProps) {
    const { t } = useTranslation();
    const [messageOpen, setMessageOpen] = useState<boolean>(false);

    // 同源检查,设置警示信息：告知跨域时 iframe 会有一些限制，建议访问源页面
    useEffect(() => {
        setMessageOpen(!!props.alert);
    }, [props.alert]);

    // SEO
    useEffect(() => {
        document.title = `${t("title")} - ${t(props.title)}`;
        document.querySelector('meta[name="description"]')?.setAttribute("content", t(props.description));
    }, [t, props.title, props.description]);

    return (
        <Box sx={{width: '100%', height: '100%'}}>
            <Frame url={props.url}>
                {
                    props.severity && 
                    <FabMessage 
                        open={messageOpen} 
                        title={t("common.notice")}
                        content={t("frame.warning-message")}
                        severity={props.severity} 
                        variant="standard"
                        onOpen={()=>setMessageOpen(true)} 
                        sx={{position:'relative', top: 0, bottom: 0, left:0, right: 0}}
                        fabSx={{position:'absolute', left: 32, bottom: 32, zIndex:10}}
                    >
                        <Box display="flex" gap={1} justifyContent='flex-end'>
                            <Button variant="contained" color={props.severity} href={props.url} target="_blank">{t("frame.go-to-source-page")}</Button>
                            <Button variant="text" color="inherit" onClick={()=>setMessageOpen(false)}>{t("common.close")}</Button>
                        </Box>
                    </FabMessage>
                }
            </Frame>
        </Box>
    )
}
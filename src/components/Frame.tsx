import { Box, Button, Fab } from "@mui/material";
import PriorityHighSharpIcon from '@mui/icons-material/PriorityHighSharp';
import MessageBox from "./MessageBox";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

export interface FrameProps {
    url: string;        // 源页面地址
    warning: boolean;   // 是否显示警告信息
}

export default function Frame(props:FrameProps) {
    const { t } = useTranslation();
    const [dialogOpen, setDialogOpen] = useState(props.warning);

    useEffect(() => {
        setDialogOpen(props.warning);
    }, [props.url, props.warning])
    
    return (
        <Box sx={{width: '100%', height: '100%'}}>
            <Fab 
                color="warning" 
                sx={{position:'absolute', left: 32, bottom: 32, zIndex:10}}
                onClick={()=>setDialogOpen(true)}
            >
                <PriorityHighSharpIcon />
            </Fab>
            <MessageBox 
                title={t("common.notice")}
                content={t("frame.warning-message")}
                severity="warning" 
                open = {dialogOpen}
                element={
                    <Box display="flex" gap={1} justifyContent='flex-end'>
                        <Button variant="text" color="inherit" onClick={()=>setDialogOpen(false)}>{t("common.ok")}</Button>
                        <Button variant="contained" color="primary" href={props.url}>{t("frame.go-to-source-page")}</Button>
                    </Box>
                }
            />
            <iframe
                src={props.url} 
                style={{display:'block', border: 0, width: '100%', height: '100%'}}
            />
        </Box>
    )
}
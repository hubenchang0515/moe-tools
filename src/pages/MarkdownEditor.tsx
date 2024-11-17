import { Alert, Box, Button, CircularProgress, Container, FormControlLabel, IconButton, Paper, Stack, Switch, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import Markdown, { printMarkdown } from "../components/Markdown";
import { useTranslation } from "react-i18next";
import HelpIcon from '@mui/icons-material/Help';
import MessageBox from "../components/MessageBox";
import HighlightEditor from "../components/HighlightEditor";
import 'highlight.js/styles/nord.css';

export default function MarkdownEditor() {
    const { t } = useTranslation();
    const [data, setData] = useState("");
    const [markdown, setMarkdown] = useState("");
    const [autoRefresh, setAutoRefresh] = useState(true);
    const [messageOpen, setMessageOpen] = useState<boolean>(false);
    const [exporting, setExporting] = useState<boolean>(false);

    // SEO
    useEffect(() => {
        document.title = `${t("title")} - ${t("pages.markdown-editor")}`;
        document.querySelector('meta[name="description"]')?.setAttribute("content", t("description.markdown-editor"));
    }, [t]);

    useEffect(() => {
        if (autoRefresh) {
            setMarkdown(data);
        }
    }, [data]);

    return (
        <Container 
            maxWidth="xl"
            sx={{
                width: '100%',
                height: '100%',
                paddingY: 2,
                gap: 2, 
                flexWrap: "wrap",
            }}
        >   
            <Box
                sx={{
                    display: 'flex', 
                    flexGrow: 1,
                    gap: 2, 
                    alignContent: "center",
                    flexWrap: "wrap",
                }}    
            >
                <Stack
                    spacing={2}
                    sx={{
                        flexGrow: 1,
                        flexShrink: 1,
                        flexBasis: 1,
                        minWidth: '300px',
                    }} 
                >
                    <Box display={"flex"} gap={2}>
                        <Button variant="contained" component="label">
                            {t("common.open")}
                            <input 
                                type="file"
                                accept=".md"
                                style={{
                                    clip: 'rect(0 0 0 0)',
                                    clipPath: 'inset(50%)',
                                    width: 0,
                                    height: 0,
                                }}
                                onChange={async (ev) =>{
                                    if (ev.target.files && ev.target.files.length > 0) {
                                        const file = ev.target.files[0];
                                        setData(await file.text());
                                        ev.target.value = "";
                                    }
                                }}
                            />
                        </Button>

                        <Button 
                            variant="contained"
                            onClick={()=>{
                                const blob = new Blob([data],{type: 'text/plain'});
                                const url = URL.createObjectURL(blob);
                                const a = document.createElement('a');
                                a.href = url;
                                a.download = "file.md";
                                document.body.appendChild(a);
                                a.click();
                                document.body.removeChild(a);
                                URL.revokeObjectURL(url);
                            }}
                        >
                            {t("common.save")}
                        </Button>
                        
                        <Box flexGrow={1}/>
                        
                        <FormControlLabel 
                            label={t("markdown-editor.auto-refresh")} 
                            control={
                                <Tooltip arrow title={t("markdown-editor.lag-warning")}>
                                    <Switch checked={autoRefresh} onChange={(ev)=>setAutoRefresh(ev.target.checked)}/>
                                </Tooltip>
                            }
                        />
                    </Box>
                    
                    <Alert severity="info"> {t("markdown-editor.edit")} </Alert>
                    <HighlightEditor language="markdown" text={data} onChange={(text)=>setData(text)}/>
                </Stack>
                
                <Stack
                    spacing={2}
                    sx={{
                        flexGrow: 1,
                        flexShrink: 1,
                        flexBasis: 1,
                        minWidth: '300px',
                    }} 
                >
                    <Box display={"flex"} gap={2}>
                        <Button 
                            variant="contained"
                            onClick={()=>{
                                    setMarkdown(data);
                            }}
                        >
                            {t("common.refresh")}
                        </Button>
                        <Button 
                            disabled={typeof window.print !== 'function'}
                            variant="contained"
                            startIcon={exporting && <CircularProgress size={'16px'} color="inherit" />}
                            onClick={()=>{
                                const iframe = document.getElementById('iframe-to-export')! as HTMLIFrameElement;
                                setExporting(true);
                                printMarkdown(markdown, iframe).finally(() => {setExporting(false)});
                            }}
                        >
                            {t("common.export")}
                            
                        </Button>

                        <Tooltip arrow title={t("markdown-editor.info")}>
                            <IconButton onClick={()=>setMessageOpen(true)}>
                                <HelpIcon/>
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <Alert severity="info"> {t("markdown-editor.preview")} </Alert>
                    <Paper 
                        sx={{
                            flexGrow:1,
                            flexShrink: 1,
                            flexBasis: 1,
                            minWidth: '200px',
                            whiteSpace: "wrap",
                            px: 1,
                        }}
                        square
                    >
                        <Markdown text={markdown} forceRefresh/>
                    </Paper>
                </Stack>
            </Box>

            <iframe id='iframe-to-export' style={{display:'none'}}/>

            <MessageBox 
                open={messageOpen} 
                severity="info"
                onClose={()=>setMessageOpen(false)}
                title={t("common.notice")}
                content={t("markdown-editor.info")}
            />
        </Container>
    )
}
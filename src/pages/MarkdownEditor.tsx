import { Alert, Box, Button, CircularProgress, FormControlLabel, IconButton, Paper, Switch, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import Markdown, { printMarkdown } from "../components/Markdown";
import { useTranslation } from "react-i18next";
import HelpIcon from '@mui/icons-material/Help';
import MessageBox from "../components/MessageBox";
import HighlightEditor from "../components/HighlightEditor";
import html2canvas from "html2canvas";
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
        <Box 
            sx={{
                width: '100%',
                height: {md:'100%'},
                padding: 2,
                gap: 2, 
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
            }}
        >   
            <Box
                sx={{
                    minWidth: '300px',
                    maxWidth: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    flexGrow: 1,
                    flexShrink: 1,
                    flexBasis: 1,
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
                                height: 1,
                                overflow: 'hidden',
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                whiteSpace: 'nowrap',
                                width: 1,
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
                <HighlightEditor language="markdown" sx={{position: 'relative', width: '100%', overflow:'auto', flexGrow:1, flexShrink:1}} text={data} onChange={(text:string)=>setData(text)}/>
            </Box>
                
            <Box
                sx={{
                    minWidth: '300px',
                    maxWidth: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    flexGrow: 1,
                    flexShrink: 1,
                    flexBasis: 1,
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
                        variant="contained"
                        onClick={()=>{
                            const node = document.getElementById('preview')!;
                            node.classList.add('html2canvas-div');
                            html2canvas(node, {backgroundColor: '#fff'}).then((canvas) => {
                                canvas.toBlob((blob) => {
                                    if (!blob) {
                                        return;
                                    }
                                    const url = URL.createObjectURL(blob);
                                    const link = document.createElement('a');
                                    link.href = url;
                                    link.download = `markdown-image.png`;
                                    link.click();
                                    URL.revokeObjectURL(url);
                                    node.classList.remove('html2canvas-div');
                                }, 'image/png');
                            })
                        }}
                    >
                        {t("png")}
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
                        {t("pdf")}
                        
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
                        paddingX: 1,
                        minWidth: '200px',
                        whiteSpace: "wrap",
                        overflow: {lg:'auto'},
                    }}
                    square
                >
                    <Box id="preview">
                        <Markdown text={markdown} sx={{overflow:'auto'}}/>
                    </Box>
                </Paper>
            </Box>

            <iframe id='iframe-to-export' style={{display:'none'}}/>

            <MessageBox 
                open={messageOpen} 
                severity="info"
                onClose={()=>setMessageOpen(false)}
                title={t("common.notice")}
                content={t("markdown-editor.info")}
            />
        </Box>
    )
}
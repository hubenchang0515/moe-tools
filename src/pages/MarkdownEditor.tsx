import { Alert, Box, Button, Container, FormControlLabel, IconButton, Paper, Stack, Switch, TextField, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import Markdown from "../components/Markdown";
import { useTranslation } from "react-i18next";
import HelpIcon from '@mui/icons-material/Help';
import MessageBox from "../components/MessageBox";

export default function MarkdownEditor() {
    const { t } = useTranslation();
    const [data, setData] = useState("");
    const [markdown, setMarkdown] = useState("");
    const [markdownHtml, setMarkdownHtml] = useState("");
    const [autoRefresh, setAutoRefresh] = useState(true);
    const [messageOpen, setMessageOpen] = useState<boolean>(false);

    useEffect(() => {
        if (autoRefresh) {
            setMarkdown(data);
        }
    }, [data]);

    return (
        <Box >
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
                            minWidth: '200px',
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
                            
                            <Tooltip arrow title={t("markdown-editor.info")}>
                                <IconButton onClick={()=>setMessageOpen(true)}>
                                    <HelpIcon/>
                                </IconButton>
                            </Tooltip>
                        </Box>
                        
                        <Alert severity="info"> {t("markdown-editor.edit")} </Alert>
                        <TextField
                            multiline
                            fullWidth
                            value={data}
                            onChange={(ev) => setData(ev.target.value)}
                        />
                    </Stack>
                    
                    <Stack
                        spacing={2}
                        sx={{
                            flexGrow: 1,
                            flexShrink: 1,
                            flexBasis: 1,
                            minWidth: '200px',
                        }} 
                    >
                        <Box display={"flex"} gap={2}>
                            <FormControlLabel 
                                label={t("markdown-editor.auto-refresh")} 
                                control={
                                    <Tooltip arrow title={t("markdown-editor.lag-warning")}>
                                        <Switch checked={autoRefresh} onChange={(ev)=>setAutoRefresh(ev.target.checked)}/>
                                    </Tooltip>
                                }
                            />
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
                                onClick={()=>{
                                    const iframe = document.getElementById('iframe-to-export')! as HTMLIFrameElement;
                                    iframe.contentDocument!.body.className = "markdown-body";
                                    iframe.contentDocument!.body.innerHTML = markdownHtml;
                                    const hljsCss = iframe.contentDocument?.createElement('link');
                                    hljsCss!.rel = "stylesheet";
                                    hljsCss!.href = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.10.0/styles/github-dark.min.css";
                                    iframe.contentDocument!.head.append(hljsCss!);
                                    const githubMarkdownCss = iframe.contentDocument?.createElement('link');
                                    githubMarkdownCss!.rel = "stylesheet";
                                    githubMarkdownCss!.href = "https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.7.0/github-markdown.min.css";
                                    iframe.contentDocument!.head.append(githubMarkdownCss!);
                                    iframe.contentWindow!.print();
                                }}
                            >
                                {t("common.export")}
                            </Button>
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
                            <Markdown text={markdown} onChange={(html)=>setMarkdownHtml(html)}/>
                        </Paper>
                    </Stack>
                </Box>
                <iframe id='iframe-to-export' style={{display:'none'}}/>
                <MessageBox 
                    open={messageOpen} 
                    severity="info"
                    onClose={()=>setMessageOpen(false)}
                    title={t("common.notice")}
                    content={t("markdown-editor.info")}/>
            </Container>
        </Box>
    )
}
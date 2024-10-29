import { Alert, Box, Button, Container, FormControlLabel, Paper, Stack, Switch, TextField, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import Markdown from "../components/Markdown";
import { useTranslation } from "react-i18next";

export default function MarkdownEditor() {
    const { t } = useTranslation();
    const [data, setData] = useState("");
    const [markdown, setMarkdown] = useState("");
    const [markdownHtml, setMarkdownHtml] = useState("");
    const [autoRefresh, setAutoRefresh] = useState(true);

    useEffect(() => {
        if (autoRefresh) {
            setMarkdown(data);
        }
    }, [data]);

    return (
        <Container 
            maxWidth="xl" 
            sx={{
                maxWidth: '100%',
                marginY: '16px', 
                gap: 2, 
                alignContent: "center",
                flexWrap: "wrap",
            }}
        >   
            <Box
                sx={{
                    display: 'flex', 
                    flexGrow: 1,
                    marginY: '16px', 
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
                        <Tooltip arrow title={t("markdown-editor.print-warning")}>
                            <Button 
                                disabled={typeof window.print !== 'function'}
                                variant="contained"
                                onClick={()=>{
                                    const iframe = document.getElementById('iframe-to-export')! as HTMLIFrameElement;
                                    document.body.appendChild(iframe);
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
                        <Markdown text={markdown} onChange={(html)=>setMarkdownHtml(html)}/>
                    </Paper>
                </Stack>
            </Box>
            <iframe id='iframe-to-export' style={{display:'none'}}/>
        </Container>
    )
}
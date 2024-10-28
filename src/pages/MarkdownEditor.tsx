import { Alert, Box, Button, Container, FormControlLabel, Paper, Stack, Switch, TextField, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import Markdown from "../components/Markdown";
import { useTranslation } from "react-i18next";

export default function MarkdownEditor() {
    const { t } = useTranslation();
    const [data, setData] = useState("");
    const [markdown, setMarkdown] = useState("");
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
                    <FormControlLabel 
                        label={t("markdown-editor.auto-refresh")} 
                        control={
                            <Tooltip arrow title={t("markdown-editor.lag-warning")}>
                                <Switch checked={autoRefresh} onChange={(ev)=>setAutoRefresh(ev.target.checked)}/>
                            </Tooltip>
                        }
                    />
                    
                    <Alert severity="info"> {t("common.edit")} </Alert>
                    <TextField
                        multiline
                        fullWidth
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
                    <Box>
                        <Button 
                            variant="contained"
                            onClick={()=>{
                                    setMarkdown(data);
                            }}
                        >
                            {t("common.refresh")}
                        </Button>
                    </Box>
                    <Alert severity="info"> {t("common.preview")} </Alert>
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
                        <Markdown text={markdown}/>
                    </Paper>
                </Stack>
            </Box>
        </Container>
    )
}
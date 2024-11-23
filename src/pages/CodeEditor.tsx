import { Autocomplete, Box, Button, Container, TextField } from "@mui/material";
import HighlightEditor, { listLanguages } from "../components/HighlightEditor";
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";

const languages = listLanguages();

export default function CodeEditor() {
    const { t } = useTranslation();
    const [data, setData] = useState("");
    const [language, setLanguage] = useState("cpp");
    const codeRef = useRef<HTMLDivElement>(null);
    
    // SEO
    useEffect(() => {
        document.title = `${t("title")} - ${t("pages.code-editor")}`;
        document.querySelector('meta[name="description"]')?.setAttribute("content", t("description.code-editor"));
    }, [t]);

    return (
        <Container
            maxWidth="xl"
            sx={{
                width: '100%',
                height: '100%',
                paddingY: 2,
                gap: 2, 
                display: 'flex',
                flexDirection: 'column',
            }}
        >

            <Box display={"flex"} gap={2} flexWrap={'wrap'}>
                <Box display={"flex"} flexDirection={"column"} justifyContent={"center"}>
                    <Button variant="contained" component="label">
                        {t("common.open")}
                        <input 
                            type="file"
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
                </Box>
                
                <Box display={"flex"} flexDirection={"column"} justifyContent={"center"}>
                    <Button 
                        variant="contained"
                        onClick={()=>{
                            const blob = new Blob([data],{type: 'text/plain'});
                            const url = URL.createObjectURL(blob);
                            const link = document.createElement('a');
                            link.href = url;
                            link.download = `file.${language}`;
                            link.click();
                            URL.revokeObjectURL(url);
                        }}
                    >
                        {t("common.save")}
                    </Button>
                </Box>

                <Box display={"flex"} flexDirection={"column"} justifyContent={"center"}>
                    <Button 
                        variant="contained"
                        onClick={()=>{
                            if (codeRef.current) {
                                const div = document.createElement("div");
                                div.className = `language-${language} hljs`;
                                div.innerHTML = codeRef.current.innerHTML;
                                div.style.margin = '0px';
                                div.style.padding = '8px';
                                div.style.border = 'none';
                                div.style.display = 'inline-block';
                                div.style.fontFamily = 'monospace';
                                div.style.fontSize = '16px';
                                div.style.lineHeight = 'normal';
                                div.style.letterSpacing = 'normal';
                                div.style.wordSpacing = 'normal';
                                document.body.append(div);
                                html2canvas(div, {backgroundColor: '#2E342E'}).then((canvas) => {
                                    canvas.toBlob((blob) => {
                                        if (!blob) {
                                            return;
                                        }
                                        const url = URL.createObjectURL(blob);
                                        const link = document.createElement('a');
                                        link.href = url;
                                        link.download = `code-image.png`;
                                        link.click();
                                        URL.revokeObjectURL(url);
                                    }, 'image/png');
                                }).finally(() => {
                                    document.body.removeChild(div);
                                });
                            }
                        }}
                    >
                        {t("common.export")}
                    </Button>
                </Box>

                <Autocomplete
                    sx={{flexGrow: 1}}
                    options={languages}
                    value={language}
                    onChange={(_, value) => setLanguage(value??"plaintext")}
                    renderInput={(params) => <TextField {...params} label={t("code-editor.language")} />}
                />
            </Box>
            
            <HighlightEditor ref={codeRef} language={language} text={data} onChange={setData} sx={{position:'relative', flexGrow:1, overflow:'auto'}}/>
        </Container>
    )
}
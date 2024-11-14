import { Autocomplete, Box, Button, Container, TextField } from "@mui/material";
import HighlightEditor, { listLanguages } from "../components/HighlightEditor";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

const languages = listLanguages();

export default function CodeEditor() {
    const { t } = useTranslation();
    const [data, setData] = useState("");
    const [language, setLanguage] = useState("cpp");// SEO
    
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

            <Box display={"flex"} gap={2}>
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
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = `file.${language}`;
                            document.body.appendChild(a);
                            a.click();
                            document.body.removeChild(a);
                            URL.revokeObjectURL(url);
                        }}
                    >
                        {t("common.save")}
                    </Button>
                </Box>

                <Autocomplete
                    fullWidth
                    options={languages}
                    value={language}
                    onChange={(_, value) => setLanguage(value??"plaintext")}
                    renderInput={(params) => <TextField {...params} label={t("code-editor.language")} />}
                />
            </Box>
            
            <HighlightEditor language={language} text={data} sx={{position:'relative', flexGrow:1, overflow:'auto'}}/>
        </Container>
    )
}
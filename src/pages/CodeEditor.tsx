import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import HighlightEditor, { listLanguages } from "../components/HighlightEditor";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

const languages = listLanguages();

export default function CodeEditor() {
    const { t } = useTranslation();
    const [data, setData] = useState("");
    const [choice, setChoice] = useState(0);
    const [language, setLanguage] = useState("txt");

    useEffect(() => {
        if (choice < languages.length) {
            setLanguage(languages[choice]);
        } else {
            setLanguage("txt");
        }
    }, [choice])

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

                <FormControl fullWidth size="small">
                    <InputLabel id="demo-simple-select-label">{t("code-editor.language")}</InputLabel>
                    <Select label={t("code-editor.language")} value={`${choice}`} onChange={(ev) => {setChoice(Number(ev.target.value));}}>
                        {
                            languages.map((language, index) => (
                                <MenuItem key={index} value={index}>{language}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            </Box>
            
            <HighlightEditor language={language} text={data} sx={{position:'relative', flexGrow:1, overflow:'auto'}}/>
        </Container>
    )
}
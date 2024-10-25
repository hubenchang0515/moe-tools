import { Box, ButtonGroup, CssBaseline,ThemeProvider, Toolbar, Tooltip, createTheme, Button } from "@mui/material";
import CloudSyncIcon from '@mui/icons-material/CloudSync';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import BugReportIcon from '@mui/icons-material/BugReport';

import { useState } from "react";

import TitleBar from "./components/TitleBar";
import SlideMenu, { Language, SlideMenuEntries, Theme } from "./components/SlideMenu";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import ROUTES from "./routes";

import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import NotFound from "./pages/NotFound";

export default function App() {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [theme, setTheme] = useState<Theme>('system')
    const [language, setLanguage] = useState<Language>(i18n.language as Language);

    // 系统主题
    const systemDark = window.matchMedia("(prefers-color-scheme:dark)");
    const [systemTheme, setSystemTheme] = useState<'light'|'dark'>(systemDark.matches ? 'dark' : 'light'); 
    systemDark.addEventListener("change", (ev) => {setSystemTheme(ev.matches ? 'dark' : 'light')});

    // 主题配置
    const themeMode = createTheme({
        palette: {
          mode: theme === 'dark' ? 'dark' : theme === 'light' ? 'light' : systemTheme,
        },
    });

    // 语言切换
    const setLanguageI18n = (language:Language) => {
        setLanguage(language);
        i18n.changeLanguage(language);
    }

    // i18n
    const { t } = useTranslation();

    // 应用列表
    const entries:SlideMenuEntries = [
        {
            title: t('menu.apps'),
            items: ROUTES.map((item) => {
                return {
                    title: t(item.name),
                    url: `#${item.url}`,
                }
            })
        }
    ]

    return (
        <ThemeProvider theme={themeMode}>
            <CssBaseline/>
            <Box display="flex" flexDirection="column" height="100%">
                <TitleBar title={t("title")} url="https://github.com/hubenchang0515/moe-tools" onToggleMenu={() => {setMenuOpen(!menuOpen)}}/>

                <Box display="flex" width={"100%"} flexGrow={1} component="main">
                    <SlideMenu width={320} open={menuOpen} theme={theme} language={language} head={<Toolbar/>} entries={entries} onThemeChanged={(theme) => {setTheme(theme);}} onLanguageChanged={(language) => {setLanguageI18n(language);}}>
                        <Box flexGrow={1}/>
                        <ButtonGroup fullWidth color="inherit">
                            <Tooltip title={t('menu-bottom.sync')} placement="top" arrow>
                                <Button variant="text" >
                                    <CloudSyncIcon />
                                </Button>
                            </Tooltip>

                            <Tooltip title={t('menu-bottom.feedback')} placement="top" arrow>
                                <Button variant="text" href="https://github.com/hubenchang0515/moe-tools/issues" target='_blank'>
                                    <BugReportIcon />
                                </Button>
                            </Tooltip>

                            <Tooltip title={t('menu-bottom.close')} placement="top" arrow>
                                <Button variant="text" onClick={() => {setMenuOpen(false)}}>
                                    <KeyboardDoubleArrowLeftIcon />
                                </Button>
                            </Tooltip>
                        </ButtonGroup>
                    </SlideMenu>

                    <Box component="article" width={"100%"} flexGrow={1} flexShrink={1} onClick={()=>setMenuOpen(false)}>
                        <Routes>
                            <Route key="home" path="/" element={<Home/>}/>
                            {
                                ROUTES.map((item) => {
                                    return <Route key={item.name} path={item.url} element={item.element}/>
                                })
                            }
                            <Route key="404" path="*" element={<NotFound/>}/>
                        </Routes>
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    );
}
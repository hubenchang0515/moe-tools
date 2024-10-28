import { Box, ButtonGroup, CssBaseline,ThemeProvider, Tooltip, createTheme, Button } from "@mui/material";
import CloudSyncIcon from '@mui/icons-material/CloudSync';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import BugReportIcon from '@mui/icons-material/BugReport';

import { useCallback, useState } from "react";

import TitleBar from "./components/TitleBar";
import SlideMenu, { Language, SlideMenuEntries, Theme } from "./components/SlideMenu";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import ROUTES from "./routes";

import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import NotFound from "./pages/NotFound";
import About from "./pages/About";

export default function App() {
    const [menuOpen, setMenuOpen] = useState<boolean>(true);
    const [menuExpand, setMenuExpand] = useState<boolean>(false);
    const [theme, setTheme] = useState<Theme>('system');
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

    const [titleHeight, setTitleHeight] = useState(0);
    const measure = useCallback((node:any) => {
        if (node !== null) {
            setTitleHeight(node.getBoundingClientRect().height);
          }
    }, []);

    return (
        <ThemeProvider theme={themeMode}>
            <CssBaseline/>
            <Box display="flex" flexDirection="column" height="100%">
                <TitleBar ref={measure} title={t("title")} url="https://github.com/hubenchang0515/moe-tools" onToggleMenu={() => setMenuOpen(!menuOpen)}/>

                <Box display="flex" height={`calc(100% - ${titleHeight}px)`} flexGrow={1} component="main">
                    <SlideMenu
                        width={320} 
                        open={menuOpen}
                        expand={menuExpand}
                        homeUrl="#/"
                        aboutUrl="#/about"
                        advanceUrl="#/advance"
                        theme={theme} 
                        language={language} 
                        entries={entries} 
                        onOpenChanged={(open) => setMenuOpen(open)}
                        onExpandChanged={(expand) => setMenuExpand(expand)}
                        onThemeChanged={(theme) => setTheme(theme)} 
                        onLanguageChanged={(language) => setLanguageI18n(language)}
                    >
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

                            <Tooltip title={t('menu-bottom.collapse')} placement="top" arrow>
                                <Button variant="text" onClick={(ev) => {
                                    ev.stopPropagation();
                                    setMenuExpand(false);
                                }}>
                                    <KeyboardDoubleArrowLeftIcon />
                                </Button>
                            </Tooltip>
                        </ButtonGroup>
                    </SlideMenu>

                    <Box 
                        component="article" 
                        height={"100%"}
                        overflow={"auto"} 
                        flexGrow={1} 
                        flexShrink={1} 
                        onClick={() => {
                            if (menuExpand) {
                                setMenuExpand(false);
                            }
                        }}
                    >
                        <Routes>
                            <Route key="404" path="*" element={<NotFound/>}/>
                            <Route key="home" path="/" element={<Home/>}/>
                            <Route key="about" path="/about" element={<About/>}/>
                            {
                                ROUTES.map((item) => {
                                    return <Route key={item.name} path={item.url} element={item.element}/>
                                })
                            }
                        </Routes>
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    );
}
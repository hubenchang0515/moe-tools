import { Container, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Tooltip, Typography } from "@mui/material";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import BrightnessAutoIcon from '@mui/icons-material/BrightnessAuto';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import TranslateIcon from '@mui/icons-material/Translate';
import RestoreIcon from '@mui/icons-material/Restore';
import InstallDesktopIcon from '@mui/icons-material/InstallDesktop';
import GlobalSettings from "../settings";

export interface SettingsProps {
    installPrompt?: any; // 类型为 BeforeInstallPromptEvent，实验性技术，非标准
}

export default function Settings(props:SettingsProps) {
    const { t } = useTranslation();

    // SEO
    useEffect(() => {
        document.title = `${t("title")} - ${t("pages.settings")}`;
        document.querySelector('meta[name="description"]')?.setAttribute("content", t("description.base"));
    }, [t]);
    
    return (
        <Container maxWidth="md" sx={{marginTop:2}}>
            <Paper variant="outlined" square>
                <List disablePadding>
                    <ListItem disablePadding>
                        <ListItemButton onClick={()=>GlobalSettings.toggleTheme()}>
                            <ListItemIcon>
                                <Brightness4Icon />
                            </ListItemIcon>
                            <ListItemText primary={t("settings.theme")} />
                                <Tooltip title={t("theme.light")} placement="bottom" arrow>
                                    <IconButton color={GlobalSettings.theme() === 'light' ? 'primary' : 'inherit'} onClick={(ev) => {GlobalSettings.toggleTheme('light'); ev.stopPropagation();}}>
                                        <LightModeIcon/>
                                    </IconButton>
                                </Tooltip>

                                <Tooltip title={t("theme.auto")} placement="bottom" arrow>
                                    <IconButton color={GlobalSettings.theme() === 'auto' ? 'primary' : 'inherit'} onClick={(ev) => {GlobalSettings.toggleTheme('auto'); ev.stopPropagation();}}>
                                        <BrightnessAutoIcon/>
                                    </IconButton>
                                </Tooltip>

                                <Tooltip title={t("theme.dark")} placement="bottom" arrow>
                                    <IconButton color={GlobalSettings.theme() === 'dark' ? 'primary' : 'inherit'} onClick={(ev) => {GlobalSettings.toggleTheme('dark'); ev.stopPropagation();}}>
                                        <DarkModeIcon/>
                                    </IconButton>
                                </Tooltip>
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton onClick={()=>GlobalSettings.toggleLanguage()}>
                            <ListItemIcon>
                                <TranslateIcon />
                            </ListItemIcon>
                            <ListItemText primary={t("settings.language")} />
                            <Typography>
                                {t(`language.${GlobalSettings.language()}`)}
                            </Typography>
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton onClick={()=>GlobalSettings.reset()}>
                            <ListItemIcon>
                                <RestoreIcon/>
                            </ListItemIcon>
                            <ListItemText primary={t("settings.reset")} />
                        </ListItemButton>
                    </ListItem>

                    <Divider/>

                    <ListItem disablePadding>
                        <ListItemButton disabled={!props.installPrompt} onClick={()=>{props.installPrompt?.prompt()}}>
                            <ListItemIcon>
                                <InstallDesktopIcon/>
                            </ListItemIcon>
                            <ListItemText primary={props.installPrompt ? t("settings.install") : t("settings.message.pwa-not-supported")} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Paper>
        </Container>
    )
}
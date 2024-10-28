import { Box, Collapse, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Tooltip, Typography } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import AppsIcon from '@mui/icons-material/Apps';
import ExtensionIcon from '@mui/icons-material/Extension';
import TuneIcon from '@mui/icons-material/Tune';
import SettingsIcon from '@mui/icons-material/Settings';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import BrightnessAutoIcon from '@mui/icons-material/BrightnessAuto';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import TranslateIcon from '@mui/icons-material/Translate';
import InfoIcon from '@mui/icons-material/Info';
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export type SideMenuState = "hidden" | "collapse" | "expand";
export type Theme = 'light'|'system'|'dark';
export type Language = 'chinese'|'english';

export interface SlideMenuItemProps {
    title: string
    url: string
}

export interface SlideMenuGroupProps {
    title: string
    items: SlideMenuItemProps[]
}

export type SlideMenuEntries = SlideMenuGroupProps[];


export interface SlideMenuProps {
    width: number | string
    homeUrl?: string
    aboutUrl?: string
    advanceUrl?: string

    open?: boolean,
    onOpenChanged?: (open:boolean) => void

    expand?: boolean,
    onExpandChanged?: (expand:boolean) => void

    theme: Theme
    onThemeChanged: (theme:Theme) => void

    language: Language
    onLanguageChanged: (language:Language) => void

    entries?: SlideMenuEntries
    children?: React.ReactNode
}

export default function SlideMenu(props:SlideMenuProps) {
    const { t } = useTranslation();

    const [groupExpanded, setGroupExpanded] = useState<boolean[]>(Array.from({length: props.entries?.length || 0}, () => false));
    const [settingsExpanded, setSettingsExpanded] = useState<boolean>(false);
    const toggleGroup = (index:number) => {
        let values = [...groupExpanded]
        values[index] = !groupExpanded[index];
        setGroupExpanded(values);
    }


    useEffect(() => {
        if (!props.expand) {
            let values = Array.from({length: props.entries?.length || 0}, () => false);
            setGroupExpanded(values);
            setSettingsExpanded(false);
        }
    }, [props.expand])

    const toggleTheme = () => {
        props.onThemeChanged(props.theme === 'light' ? 'system' : props.theme === 'system' ? 'dark' : 'light');
    }

    const toggleLanguage = () => {
        props.onLanguageChanged(props.language === 'chinese' ? 'english' : 'chinese');
    }

    const width = typeof props.width === 'string' ? props.width : `${props.width}px`

    return (
            <Paper 
                sx={{
                    borderRadius: 0,
                    zIndex:99,
                }}
                elevation={12}
                square
            >
                <Collapse sx={{height: '100%'}} orientation="horizontal" in={props.open}>
                    <Collapse sx={{height: '100%'}} orientation="horizontal" collapsedSize={56 /* 16 + 24 + 16 => 56 */} in={props.expand}>
                        <Box sx={{
                            width: width,
                            height: '100%',
                            display:"flex", 
                            flexDirection:"column", 
                            justifyContent: "flex-start", 
                            overflowY:"auto", 
                            '&::-webkit-scrollbar': {display: "none"} // 隐藏滚动条
                        }}>
                            <List sx={{width: "100%"}}>
                                {
                                    props.homeUrl &&
                                    <ListItem disablePadding>
                                        <ListItemButton href={props.homeUrl}>
                                            <ListItemIcon>
                                                <HomeIcon/>
                                            </ListItemIcon>
                                            <ListItemText>
                                                {t("menu.home")}
                                            </ListItemText>
                                        </ListItemButton>
                                    </ListItem>
                                }

                                {
                                    props.entries?.map((group, index) => (
                                        <Box key={index}>
                                            <ListItem disablePadding>
                                                <ListItemButton onClick={() => {
                                                    toggleGroup(index);
                                                    props.onExpandChanged?.(true);
                                                }}>
                                                    <ListItemIcon>
                                                        <AppsIcon/>
                                                    </ListItemIcon>
                                                    <ListItemText primary={group.title}/>
                                                    {groupExpanded[index] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                                </ListItemButton>
                                            </ListItem>
                                            <Collapse in={props.expand && groupExpanded[index]} timeout="auto" unmountOnExit>
                                                <List component="div" disablePadding >
                                                    {
                                                        group?.items.map((item, index) => (
                                                            <ListItem disablePadding key={index}>
                                                                <ListItemButton sx={{ pl: 4 }} href={item.url}>
                                                                    <ListItemIcon><ExtensionIcon /></ListItemIcon>
                                                                    <ListItemText primary={item.title} />
                                                                </ListItemButton>
                                                            </ListItem>
                                                        ))
                                                    }
                                                </List>
                                            </Collapse>
                                        </Box>
                                        
                                    ))
                                }

                                <ListItem disablePadding>
                                    <ListItemButton onClick={() => {
                                        setSettingsExpanded(!settingsExpanded);
                                        props.onExpandChanged?.(true);
                                    }}>
                                        <ListItemIcon>
                                            <TuneIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary={t("menu.settings")}/>
                                        {settingsExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                    </ListItemButton>
                                </ListItem>

                                <Collapse in={props.expand && settingsExpanded} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        <ListItem disablePadding>
                                            <ListItemButton sx={{ pl: 4 }} onClick={toggleTheme}>
                                                <ListItemIcon>
                                                    <Brightness4Icon />
                                                </ListItemIcon>
                                                <ListItemText primary={t("settings.theme")} />
                                                    <Tooltip title={t("theme.light")} placement="top" arrow>
                                                        <IconButton color={props.theme === 'light' ? 'primary' : 'inherit'} onClick={(ev) => {props.onThemeChanged('light'); ev.stopPropagation();}}>
                                                            <LightModeIcon/>
                                                        </IconButton>
                                                    </Tooltip>

                                                    <Tooltip title={t("theme.system")} placement="top" arrow>
                                                        <IconButton color={props.theme === 'system' ? 'primary' : 'inherit'} onClick={(ev) => {props.onThemeChanged('system'); ev.stopPropagation();}}>
                                                            <BrightnessAutoIcon/>
                                                        </IconButton>
                                                    </Tooltip>

                                                    <Tooltip title={t("theme.dark")} placement="top" arrow>
                                                        <IconButton color={props.theme === 'dark' ? 'primary' : 'inherit'} onClick={(ev) => {props.onThemeChanged('dark'); ev.stopPropagation();}}>
                                                            <DarkModeIcon/>
                                                        </IconButton>
                                                    </Tooltip>
                                                
                                            </ListItemButton>
                                        </ListItem>

                                        <ListItem disablePadding>
                                            <ListItemButton sx={{ pl: 4 }} onClick={toggleLanguage}>
                                                <ListItemIcon>
                                                    <TranslateIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={t("settings.language")} />
                                                <Typography>
                                                    {props.language === 'chinese' ? "简体中文" : "English"}
                                                </Typography>
                                            </ListItemButton>
                                        </ListItem>

                                        {
                                            props.aboutUrl &&
                                            <ListItem disablePadding>
                                                <ListItemButton sx={{ pl: 4 }} href={props.aboutUrl}>
                                                    <ListItemIcon>
                                                        <InfoIcon />
                                                    </ListItemIcon>
                                                    <ListItemText primary={t("settings.about")} />
                                                </ListItemButton>
                                            </ListItem>
                                        }

                                        {
                                            props.advanceUrl &&
                                            <ListItem disablePadding>
                                                <ListItemButton sx={{ pl: 4 }} href={props.advanceUrl}>
                                                    <ListItemIcon>
                                                        <SettingsIcon />
                                                    </ListItemIcon>
                                                    <ListItemText primary={t("settings.advance")} />
                                                </ListItemButton>
                                            </ListItem>
                                        }
                                        
                                    </List>
                                </Collapse>    
                            </List>

                            <Box flexGrow={1} flexShrink={1} onClick={()=>props.onExpandChanged?.(true)}/>
                            {props.expand && props.children}
                        </Box>
                    </Collapse>
                </Collapse>
            </Paper>
    )
}
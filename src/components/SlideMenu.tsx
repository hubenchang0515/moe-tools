import { Box, Collapse, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Slide, Tooltip, Typography } from "@mui/material";
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
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

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
    open: boolean
    width: number | string

    theme: Theme
    onThemeChanged: (theme:Theme) => void

    language: Language
    onLanguageChanged: (language:Language) => void

    head?: React.ReactNode
    entries?: SlideMenuEntries
    children?: React.ReactNode
}

export default function SlideMenu(props:SlideMenuProps) {
    // i18n
    const { t } = useTranslation();

    const [groupExpanded, setGroupExpanded] = useState<boolean[]>(Array.from({length: props.entries?.length || 0}, () => false));
    const toggleGroup = (index:number) => {
        let values = [...groupExpanded]
        values[index] = !groupExpanded[index];
        setGroupExpanded(values);
    }


    const [settingsExpanded, setSettingsExpanded] = useState<boolean>(false);

    const toggleTheme = () => {
        props.onThemeChanged(props.theme === 'light' ? 'system' : props.theme === 'system' ? 'dark' : 'light');
    }

    const toggleLanguage = () => {
        props.onLanguageChanged(props.language === 'chinese' ? 'english' : 'chinese');
    }

    const width = typeof props.width === 'string' ? props.width : `${props.width}px`

    return (
        <Slide direction="right" mountOnEnter unmountOnExit in={props.open}>
            <Paper 
                sx={{ 
                    minWidth:width, 
                    position: "fixed", 
                    borderRadius: 0,
                    top:0, 
                    bottom:0, 
                    zIndex:99, 
                    display:"flex", 
                    flexDirection:"column", 
                    justifyContent: "flex-start", 
                    overflowY:"auto", 
                    '&::-webkit-scrollbar': {display: "none"} // 隐藏滚动条
                }}
                elevation={12}
                square
            >
                {props.head}
                <List sx={{width: "100%"}}>
                    <ListItem disablePadding>
                        <ListItemButton href="#">
                            <ListItemIcon>
                                <HomeIcon/>
                            </ListItemIcon>
                            <ListItemText>
                                {t("menu.home")}
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>

                    {
                        props.entries?.map((group, index) => (
                            <Box key={index}>
                                <ListItem disablePadding>
                                    <ListItemButton onClick={() => {toggleGroup(index);}}>
                                        <ListItemIcon>
                                            <AppsIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary={group.title}/>
                                        {groupExpanded[index] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                    </ListItemButton>
                                </ListItem>
                                <Collapse in={groupExpanded[index]} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding >
                                        {
                                            group?.items.map((item) => (
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
                        <ListItemButton onClick={() => {setSettingsExpanded(!settingsExpanded);}}>
                            <ListItemIcon>
                                <TuneIcon/>
                            </ListItemIcon>
                            <ListItemText primary={t("menu.settings")}/>
                            {settingsExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </ListItemButton>
                    </ListItem>

                    <Collapse in={settingsExpanded} timeout="auto" unmountOnExit>
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

                            <ListItem disablePadding>
                                <ListItemButton sx={{ pl: 4 }}>
                                    <ListItemIcon>
                                    <SettingsIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={t("settings.advance")} />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Collapse>    
                </List>

                {props.children}
            </Paper>
        </Slide>
    )
}
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
import InfoIcon from '@mui/icons-material/Info';
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export type SideMenuState = "hidden" | "collapse" | "expand";

export interface SlideMenuItemProps {
    label: string;
    url: string;
    icon?: JSX.Element;
    onClick?: ()=>void;
}

export interface SlideMenuGroupProps {
    label: string;
    items: SlideMenuItemProps[];
    icon?: JSX.Element;
}

export type SlideMenuEntries = SlideMenuGroupProps[];


export interface SlideMenuProps {
    width: number | string;
    home?: SlideMenuItemProps;
    about?: SlideMenuItemProps;
    advance?: SlideMenuItemProps;

    open?: boolean;
    onOpenChanged?: (open:boolean) => void;

    expand?: boolean;
    onExpandChanged?: (expand:boolean) => void;

    theme: string;
    toggleTheme: (theme?:string) => void;

    language: string;
    toggleLanguage: (language?:string) => void;

    entries?: SlideMenuEntries;
    children?: JSX.Element;
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

    const [childrenVisible, setChildrenVisible] = useState(false);

    useEffect(() => {
        if (!props.expand) {
            let values = Array.from({length: props.entries?.length || 0}, () => false);
            setGroupExpanded(values);
            setSettingsExpanded(false);
        }
    }, [props.expand])

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
                    <Collapse 
                        sx={{height: '100%'}} 
                        orientation="horizontal" 
                        collapsedSize={56 /* 16 + 24 + 16 => 56 */} 
                        in={props.expand} 
                        onEntered={()=>setChildrenVisible(true)}
                        onExit={()=>setChildrenVisible(false)}
                    >
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
                                    props.home &&
                                    <ListItem disablePadding>
                                        <ListItemButton to={props.home.url} component={Link} onClick={props.home.onClick}>
                                            <ListItemIcon>
                                                {props.home.icon || <HomeIcon/>}
                                            </ListItemIcon>
                                            <ListItemText>
                                                {props.home.label}
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
                                                        {group.icon  ?? <AppsIcon/>}
                                                    </ListItemIcon>
                                                    <ListItemText primary={group.label}/>
                                                    {groupExpanded[index] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                                </ListItemButton>
                                            </ListItem>
                                            <Collapse in={props.expand && groupExpanded[index]} timeout="auto" unmountOnExit>
                                                <List component="div" disablePadding >
                                                    {
                                                        group?.items.map((item, index) => (
                                                            <ListItem disablePadding key={index}>
                                                                <ListItemButton sx={{ pl: 4 }} to={item.url} component={Link} onClick={item.onClick}>
                                                                    <ListItemIcon>
                                                                        {item.icon ?? <ExtensionIcon />}
                                                                    </ListItemIcon>
                                                                    <ListItemText primary={item.label} />
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
                                            <ListItemButton sx={{ pl: 4 }} onClick={()=>props.toggleTheme()}>
                                                <ListItemIcon>
                                                    <Brightness4Icon />
                                                </ListItemIcon>
                                                <ListItemText primary={t("settings.theme")} />
                                                    <Tooltip title={t("theme.light")} placement="top" arrow>
                                                        <IconButton color={props.theme === 'light' ? 'primary' : 'inherit'} onClick={(ev) => {props.toggleTheme('light'); ev.stopPropagation();}}>
                                                            <LightModeIcon/>
                                                        </IconButton>
                                                    </Tooltip>

                                                    <Tooltip title={t("theme.auto")} placement="top" arrow>
                                                        <IconButton color={props.theme === 'auto' ? 'primary' : 'inherit'} onClick={(ev) => {props.toggleTheme('auto'); ev.stopPropagation();}}>
                                                            <BrightnessAutoIcon/>
                                                        </IconButton>
                                                    </Tooltip>

                                                    <Tooltip title={t("theme.dark")} placement="top" arrow>
                                                        <IconButton color={props.theme === 'dark' ? 'primary' : 'inherit'} onClick={(ev) => {props.toggleTheme('dark'); ev.stopPropagation();}}>
                                                            <DarkModeIcon/>
                                                        </IconButton>
                                                    </Tooltip>
                                                
                                            </ListItemButton>
                                        </ListItem>

                                        <ListItem disablePadding>
                                            <ListItemButton sx={{ pl: 4 }} onClick={()=>props.toggleLanguage()}>
                                                <ListItemIcon>
                                                    <TranslateIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={t("settings.language")} />
                                                <Typography>
                                                    {t(`language.${props.language}`)}
                                                </Typography>
                                            </ListItemButton>
                                        </ListItem>

                                        {
                                            props.about &&
                                            <ListItem disablePadding>
                                                <ListItemButton sx={{ pl: 4 }} to={props.about.url} component={Link} onClick={props.about.onClick}>
                                                    <ListItemIcon>
                                                        {props.about.icon || <InfoIcon />}
                                                    </ListItemIcon>
                                                    <ListItemText primary={props.about.label} />
                                                </ListItemButton>
                                            </ListItem>
                                        }

                                        {
                                            props.advance &&
                                            <ListItem disablePadding>
                                                <ListItemButton sx={{ pl: 4 }} to={props.advance.url} component={Link} onClick={props.advance.onClick}>
                                                    <ListItemIcon>
                                                        {props.advance.icon || <SettingsIcon />}
                                                    </ListItemIcon>
                                                    <ListItemText primary={props.advance.label} />
                                                </ListItemButton>
                                            </ListItem>
                                        }
                                        
                                    </List>
                                </Collapse>    
                            </List>

                            <Box flexGrow={1} flexShrink={1} onClick={()=>props.onExpandChanged?.(true)}/>

                            {
                                props.children && 
                                <Slide in={props.expand && childrenVisible} direction="up" mountOnEnter unmountOnExit>
                                    {props.children}
                                </Slide>
                            }
                            
                        </Box>
                    </Collapse>
                </Collapse>
            </Paper>
    )
}
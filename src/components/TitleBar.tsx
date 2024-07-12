import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import GitHubIcon from '@mui/icons-material/GitHub';
import SearchInput from "./SearchInput";

export interface TitleBarProps {
    title: string
    url: string

    onToggleMenu: () => void
}

export default function TitleBar(props:TitleBarProps) {
    return (
        <Box>
            <AppBar component="nav" color="primary" elevation={24}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: props.title ? 2:0 }}
                        onClick={props.onToggleMenu}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ minWidth: '5em', mr: 2, whiteSpace:"nowrap"}}>
                        {props.title}
                    </Typography>

                    <Box sx={{ flexGrow: 1 }} />

                    <SearchInput/>

                    <Box sx={{ flexGrow: 1 }} />
                    
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ ml: 2 }}
                        href={props.url || ""}
                        target='_blank'
                    >
                        <GitHubIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Toolbar/>
        </Box>
    )
}
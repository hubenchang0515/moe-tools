import { Box, Card, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import LaunchIcon from '@mui/icons-material/Launch';
import { Link } from "react-router-dom";

export interface AppCardProps {
    name: string;
    url: string;
    image: string;
    onLaunch?: ()=>void;
}

export default function AppCard(props:AppCardProps) {
    return (
        <Card 
            sx={{ 
                display: 'flex', 
                ':hover': {
                    boxShadow: 12,
                }
            }}
        >
            <CardMedia
                component="img"
                sx={{ width: '50%', aspectRatio:4/3, imageRendering:'pixelated', objectFit:'cover'}}
                image={props.image}
                alt="Live from space album cover"
            />
            <Box sx={{ flexGrow:1, display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="subtitle1">
                    {props.name}
                </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:'end', p: 1}}>
                    <IconButton component={Link} to={props.url} onClick={props.onLaunch}>
                        <LaunchIcon/>
                    </IconButton>
                </Box>
            </Box>
        </Card>
    )
}
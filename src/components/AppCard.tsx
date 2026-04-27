import { Card, CardContent, Grid2, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";

export interface AppCardProps {
    icon: JSX.Element;
    name: string;
    desc: string;
    url: string;
    onLaunch?: ()=>void;
}

export default function AppCard(props:AppCardProps) {
    const theme = useTheme();
    return (
        <Card 
            className="AppCard"
            elevation={0}
            sx={{ 
                display: 'flex',
                boxShadow: 'none',
                flexDirection: 'column',
                textDecoration: 'none',
                borderRadius: 4,
                border: `1px solid ${theme.palette.divider}`,
                color: theme.palette.text.secondary,
                ':hover': {
                    borderColor: theme.palette.info.main,
                    color: theme.palette.info.main,
                    boxShadow: `0 0 6px ${theme.palette.info.main}`,
                }
            }}
            component={Link}
            to={props.url}
            onClick={props.onLaunch}
        >
            <CardContent>
                <Grid2 container spacing={1}>
                    <Grid2 size={1} alignSelf='center' justifyItems='center'>
                        <Typography sx={{display:'flex', alignItems:'center'}}>
                            {props.icon}
                        </Typography>
                    </Grid2>
                    <Grid2 size={11} alignSelf='center' >
                        <Typography component="p" variant="h6" noWrap>
                            {props.name}
                        </Typography>
                    </Grid2>
                    {/* <Grid2 size={1}/> */}
                    <Grid2 size={12}>
                        <Typography component="div" variant="body2" sx={{lineHeight:1.1, height:'3.3em', overflow:'hidden'}}>
                            {props.desc}
                        </Typography>
                    </Grid2>
                </Grid2>
            </CardContent>
        </Card>
    )
}
import * as marked from "marked";
import hljs from 'highlight.js';
import 'highlight.js/styles/vs2015.css';
import { useEffect, useRef } from "react";
import { Box, SxProps, Theme, useTheme } from "@mui/material";

export interface MarkdownProps {
    text?: string
    url?: string
}

export default function Markdown(props:MarkdownProps) {
    const theme = useTheme();

    const style:SxProps<Theme> = {
        '& *': {
            marginBlock: '16px',
            marginInline: 0,
            padding: 0,
        },

        '& h1': theme.typography.h1,

        '& h2': theme.typography.h2,

        '& h3': theme.typography.h3,

        '& h4': theme.typography.h4,

        '& h5': theme.typography.h5,

        '& h6': theme.typography.h6,

        '& p': {
            ...theme.typography.body1,
            textIndent: '2em',
            wordBreak: 'break-all',
        },

        '& blockquote': {
            ...theme.typography.body2,
            p: '16px',
            border: `1px solid ${theme.palette.divider}`,
            borderLeft: `8px solid ${theme.palette.divider}`,
            backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
        },

        '& blockquote > *': {
            margin: 0,
        },

        '& img': {
            display: 'block',
            maxWidth: '100%',
            objectFit: 'cover',
            margin: '0 auto',
        },

        "& :not(pre) > code": {
            color: theme.palette.secondary.main,
            px: 1,
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 1,
        },
    
        "& table": {
            borderCollapse: "collapse",
        },
    
        "& th, td": {
            padding: 1,
            border: `1px solid ${theme.palette.divider}`,
        },

        "& th, tr:nth-child(even)": {
            backgroundColor: theme.palette.mode === "dark" ? theme.palette.grey[800] : theme.palette.grey[100],
        },

        "& tr:nth-child(odd)": {
            backgroundColor: theme.palette.mode === "dark" ? theme.palette.grey[700] : theme.palette.grey[200],
        },
    }

    const divRef = useRef<HTMLDivElement>();

    useEffect(() => {
        if (props.text) {
            marked.parse(props.text, {async: true}).then((value) => {
                if (divRef.current) {
                    divRef.current.innerHTML = value;
                    hljs.highlightAll();
                }
            }) ;
        } else if (props.url) {
            fetch(props.url).then(async (response) => {
                if (response.ok && divRef.current) {
                    divRef.current.innerHTML = await marked.parse(await response.text(), {async: true});
                    hljs.highlightAll();
                    console.log("refresh");
                }
            });
        }
    }, [props.text, props.url, divRef.current]);

    return (
        <Box className="markdown" ref={divRef} sx={style}/>
    )
}
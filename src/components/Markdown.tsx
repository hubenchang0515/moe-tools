import * as marked from "marked";
import hljs from 'highlight.js';
import 'highlight.js/styles/vs2015.css';
import { useEffect, useRef } from "react";
import { Box, SxProps, Theme, useTheme } from "@mui/material";

export interface MarkdownProps {
    text?: string
    url?: string
    onChange?: (html:string)=>void
}

export default function Markdown(props:MarkdownProps) {
    const theme = useTheme();

    const style:SxProps<Theme> = {
        overflow: 'auto',

        '& *': {
            marginBlock: '16px',
            marginInline: 0,
            
        },

        '& h1': {
            ...theme.typography.h1,
            wordBreak: 'break-all',
            whiteSpace: 'wrap',
            
        },

        '& h2': {
            ...theme.typography.h2,
            wordBreak: 'break-all',
            whiteSpace: 'wrap',
        },

        '& h3': {
            ...theme.typography.h3,
            wordBreak: 'break-all',
            whiteSpace: 'wrap',
        },

        '& h4': {
            ...theme.typography.h4,
            wordBreak: 'break-all',
            whiteSpace: 'wrap',
        },

        '& h5': {
            ...theme.typography.h5,
            wordBreak: 'break-all',
            whiteSpace: 'wrap',
        },

        '& h6': {
            ...theme.typography.h6,
            wordBreak: 'break-all',
            whiteSpace: 'wrap',
        },

        '& p': {
            ...theme.typography.body1,
            textIndent: '2em',
            wordBreak: 'break-all',
            whiteSpace: 'wrap',
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

        "& th, tr:nth-of-type(even)": {
            backgroundColor: theme.palette.mode === "dark" ? theme.palette.grey[800] : theme.palette.grey[100],
        },

        "& tr:nth-of-type(odd)": {
            backgroundColor: theme.palette.mode === "dark" ? theme.palette.grey[700] : theme.palette.grey[200],
        },
    }

    const divRef = useRef<HTMLDivElement>();

    useEffect(() => {
        if (props.text !== undefined) {
            marked.parse(props.text, {async: true}).then((value) => {
                if (divRef.current) {
                    divRef.current.innerHTML = value;
                    hljs.highlightAll();
                    props.onChange?.(divRef.current.innerHTML);
                }
            }) ;
        } else if (props.url) {
            fetch(props.url).then(async (response) => {
                if (response.ok && divRef.current) {
                    divRef.current.innerHTML = await marked.parse(await response.text(), {async: true});
                    hljs.highlightAll();
                    props.onChange?.(divRef.current.innerHTML);
                }
            });
        }
    }, [props.text, props.url, divRef.current]);

    return (
        <Box className="markdown" ref={divRef} sx={style}/>
    )
}
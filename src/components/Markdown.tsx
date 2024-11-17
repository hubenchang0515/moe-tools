import { marked, Token, Tokens } from "marked";
import hljs from 'highlight.js';
import { useEffect, useState } from "react";
import { Alert, AlertProps, Box, Chip, Divider, Link, Paper, SxProps, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Theme, Typography, TypographyProps } from "@mui/material";

export interface MarkdownProps {
    text?: string
    url?: string
    forceRefresh?: boolean
    sx?: SxProps<Theme>
}

function escapeHTML(text:string) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function unescapeHTML(text:string) {
    const div = document.createElement('div');
    div.innerHTML = text;
    return div.textContent??"";
}

export function printMarkdown(markdown:string, iframe:HTMLIFrameElement) {
    return new Promise((resolve, reject) => {
        const renderer = new marked.Renderer();

        renderer.heading = ({ text, depth }) => {
            const id = unescapeHTML(text).replace(/\s+/g, "-");
            return `<h${depth} id=${id}>${text}</h${depth}>`;
        }

        marked.parse(markdown, {async: true, renderer:renderer}).then((value) => {
            try {
                iframe.contentDocument!.body.className = "markdown-body";
                iframe.contentDocument!.body.innerHTML = value;
    
                const hljsCss = iframe.contentDocument!.createElement('link');
                hljsCss.rel = "stylesheet";
                hljsCss.href = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.10.0/styles/github.min.css";
                iframe.contentDocument!.head.append(hljsCss);
    
                const hljsScript = iframe.contentDocument!.createElement('script');
                hljsScript.src = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js";
                iframe.contentDocument!.head.append(hljsScript);
    
                const githubMarkdownCss = iframe.contentDocument!.createElement('link');
                githubMarkdownCss.rel = "stylesheet";
                githubMarkdownCss.href = "https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.7.0/github-markdown.min.css";
                iframe.contentDocument!.head.append(githubMarkdownCss);
    
                const otherStyle = iframe.contentDocument!.createElement('style');
                otherStyle.textContent = "code * {white-space:pre-wrap; }";
                iframe.contentDocument!.head.append(otherStyle);
                
                hljsScript.onload = () => {
                    const highlightAllScript = iframe.contentDocument!.createElement('script');
                    highlightAllScript.textContent = "hljs.highlightAll();";
                    iframe.contentDocument!.body.append(highlightAllScript);
                    iframe.contentWindow!.print();
                    resolve(null);
                }
            } catch (e) {
                reject(e);
            }
        });
    })
}

const HEADING_VERIANTS = ["h1", "h2", "h3", "h4", "h5", "h6", "subtitle1", "subtitle2", "body1", "body2", "caption", "button", "overline"];
const HEADING_COLORS = ["primary", "secondary", "success", "error", "info", "warning"];
const HEADING_ALIGNS = ["left", "center", "right", "justify"];

const ALERT_SERERITIES = ["success", "info", "warning", "error"];
const ALERT_VAIRIANTS = ["standard", "filled", "outlined"];

function MarkdownToken(props:{token:Token}):JSX.Element {
    switch (props.token.type) {
        case "space":
            return <> </>;
        
        case "code": {
            const token = props.token as Tokens.Code;
            return <pre><code className={`language-${token.lang||"plaintext"}`}>{token.text}</code></pre>; 
        }

        case "heading": {
            const token = props.token as Tokens.Heading;
            const matches = /^\[!(.+)\]\s*/.exec(token.text);
            const text = token.text.replace(/^\[!(.+)\]\s*/, "")
            if (matches) {
                // [!variant, color, align]
                const args = matches[1].split(",");
                const variant = (args.length > 0 && HEADING_VERIANTS.includes(args[0].trim()) ? args[0].trim() : `h${token.depth}`) as TypographyProps['variant'];
                const color = (args.length > 1 && HEADING_COLORS.includes(args[1].trim()) ? args[1].trim() : "inherit") as TypographyProps['color'];
                const align = (args.length > 2 && HEADING_ALIGNS.includes(args[2].trim()) ? args[2].trim() : "inherit") as TypographyProps['align'];
                return (
                    <Typography id={escapeHTML(text).replace(/\s+/g, "-")} variant={variant} color={color} align={align}>
                        {
                            token.tokens.map((token,index) => {
                                return <MarkdownToken key={index} token={token}/>
                            })
                        }
                    </Typography>
                )
            } else {
                return (
                    <Typography id={escapeHTML(token.text).replace(/\s+/g, "-")} variant={`h${token.depth}` as TypographyProps['variant']}>
                        {
                            token.tokens.map((token,index) => {
                                return <MarkdownToken key={index} token={token}/>
                            })
                        }
                    </Typography>
                )
            }
        }

        case "table": {
            const token = props.token as Tokens.Table;
            return (
                <TableContainer component={Paper} sx={{marginBlock:'8px'}}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {
                                    token.header.map((item, index) => {
                                        return (
                                            <TableCell key={index} align={item.align??undefined}>
                                                {
                                                    item.tokens.map((token, index) => {
                                                        return <MarkdownToken key={index} token={token}/>
                                                    })
                                                }
                                            </TableCell>
                                        )
                                    })
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                                {
                                    token.rows.map((row, index) => {
                                        return (
                                            <TableRow key={index}>
                                                {
                                                    row.map((item, index) => {
                                                        return (
                                                            <TableCell key={index} align={item.align??undefined}>
                                                                {
                                                                    item.tokens.map((token, index) => {
                                                                        return <MarkdownToken key={index} token={token}/>
                                                                    })
                                                                }
                                                            </TableCell>
                                                        )
                                                    })
                                                }
                                            </TableRow>
                                        )
                                    })
                                }
                        </TableBody>
                    </Table>
                </TableContainer>
            );
        }

        case "hr":
            return <Divider/>;

        case "blockquote": {
            const token = props.token as Tokens.Blockquote
            const matches = /^\[!(.+)\]\s*/.exec(token.text);
            if (matches) {
                // [!severity, variant]
                const args = matches[1].split(",");
                const severity = (args.length > 0 && ALERT_SERERITIES.includes(args[0].trim()) ? args[0].trim() : "info") as AlertProps['severity'];
                const variant = (args.length > 1 && ALERT_VAIRIANTS.includes(args[1].trim()) ? args[1].trim() : "standard") as AlertProps['variant'];
                return (
                    <Alert severity={severity} variant={variant} sx={{marginBlock:'8px'}}>
                        {
                            token.tokens.map((token, index) => {
                                return <MarkdownToken key={index} token={token}/>
                            })
                        }
                    </Alert>
                )
            } else {
                return (
                    <Alert severity="info" sx={{marginBlock:'8px'}}>
                        {
                            token.tokens.map((token, index) => {
                                return <MarkdownToken key={index} token={token}/>
                            })
                        }
                    </Alert>
                );
            }
        }

        case "list": {
            const token = props.token as Tokens.List
            if (token.ordered) {
                return (
                    <ol>
                        {
                            token.items.map((item, index) => {
                                return <MarkdownToken key={index} token={item}/>
                            })
                        }
                    </ol>
                )
            } else {
                return (
                    <ul>
                        {
                            token.items.map((item, index) => {
                                return <MarkdownToken key={index} token={item}/>
                            })
                        }
                    </ul>
                )
            }
        }

        case "list_item": {
            const token = props.token as Tokens.ListItem
            return (
                <li>
                    {
                        token.tokens.map((item, index) => {
                            return <MarkdownToken key={index} token={item}/>
                        })
                    }
                </li>
            )
        }

        case "paragraph": {
            const token = props.token as Tokens.Paragraph
            let tokens:Token[] = []
            // 忽略段落开头的特殊标记 [!xxx] 以及它之后的换行
            if (token.tokens.length > 1 && /^\[!.+\]\s*$/.test(token.tokens[0].raw)) {
                tokens = token.tokens.slice(token.tokens[1].type === "br" ? 2 : 1);
            } else if(token.tokens.length > 0 && /^\[!.+\]\s*$/.test(token.tokens[0].raw)) {
                tokens = token.tokens.slice(1);
            }else {
                tokens = token.tokens
            }
            
            return (
                <Typography variant="body1">
                    {
                        tokens.map((item, index) => {
                            return <MarkdownToken key={index} token={item}/>
                        })
                    }
                </Typography>
            )
        }

        case "html": {
            const token = props.token as Tokens.HTML
            return <span dangerouslySetInnerHTML={{__html: token.raw}}/>;
        }

        case "text": {
            const token = props.token as Tokens.Text
            if (token.tokens) {
                return (
                    <>
                        {
                            token.tokens.map((item, index) => {
                                return <MarkdownToken key={index} token={item}/>
                            })
                        }
                    </>
                )
            } else if(token.text.match(/{#[a-zA-Z_]+[a-zA-Z_0-9]*}/g)) {
                // 自定义锚点 {#xxxx}
                const matches = token.text.match(/{#[a-zA-Z_]+[a-zA-Z_0-9]*}/g)!;
                const items = token.text.split(/{#[a-zA-Z_]+[a-zA-Z_0-9]*}/g);
                return (
                    <span>
                        {
                            matches.map((match, index) => {
                                return <span key={index} id={match.slice(2, -1)}/>
                            })
                        }
                        {
                            items.map((item, index) => {
                                return <span key={index}>{unescapeHTML(item)}</span>
                            })
                        }
                    </span>
                )
            } else if(/^\[!.+\]\s*/.test(token.text)) {
                // 清除特殊标记 [!xxx]
                return <>{unescapeHTML(token.text.replace(/^\[!.+\]\s*/, ""))}</>
            } else {
                return <>{unescapeHTML(token.text)}</>
            }
        }

        case "def":
            return <div>TODO:def</div>;

        case "escape": {
            const token = props.token as Tokens.Escape
            return <>{unescapeHTML(token.text)}</>
        }

        case "tag":
            return <div>TODO:tag</div>;

        case "image": {
            const token = props.token as Tokens.Image
            return <img src={token.href} style={{maxWidth: '100%'}}/>;
        }

        case "link": {
            const token = props.token as Tokens.Link;

            if (token.href.startsWith("#")) {
                const anchor = token.href.slice(1);
                return (
                    <Link component="button" variant="caption" onClick={()=>{document.getElementById(anchor)?.scrollIntoView({behavior:"smooth"})}}>
                        {
                            token.tokens.map((item, index) => {
                                return <MarkdownToken key={index} token={item}/>
                            })
                        }
                    </Link>
                );
            } else {
                return (
                    <Link href={token.href}>
                        {
                            token.tokens.map((item, index) => {
                                return <MarkdownToken key={index} token={item}/>
                            })
                        }
                    </Link>
                );
            }
        }

        case "strong": {
            const token = props.token as Tokens.Strong;
            return (
                <strong>
                    {
                        token.tokens.map((item, index) => {
                            return <MarkdownToken key={index} token={item}/>
                        })
                    }
                </strong>
            );
        }

        case "em": {
            const token = props.token as Tokens.Em;
            return (
                <em>
                    {
                        token.tokens.map((item, index) => {
                            return <MarkdownToken key={index} token={item}/>
                        })
                    }
                </em>
            );
        }

        case "codespan": {
            const token = props.token as Tokens.Codespan;
            return (
                <Chip component="span" variant="outlined" color="secondary" size="small" label={unescapeHTML(token.text)}></Chip >
            );
        }

        case "br":
            return <br/>;

        case "del": {
            const token = props.token as Tokens.Del;
            return (
                <del>
                    {
                        token.tokens.map((item, index) => {
                            return <MarkdownToken key={index} token={item}/>
                        })
                    }
                </del>
            );
        }
    }

    return <></>
}

export default function Markdown(props:MarkdownProps) {
    const [key, setKey] = useState(0);
    const [tokens, setTokens] = useState<Token[]>([]);

    useEffect(() => {
        if (props.forceRefresh) {
            setKey((key + 1) % 100);
        }
        if (props.text !== undefined) {
            const tokens = marked.lexer(props.text, {gfm:true});
            setTokens(tokens);
        } else if (props.url) {
            fetch(props.url).then((response) => {
                if (response.ok) {
                    response.text().then((text) => {
                        const tokens = marked.lexer(text, {gfm:true});
                        setTokens(tokens);
                    })
                }
            });
        }
    }, [props.text, props.url]);

    useEffect(() => {
        hljs.highlightAll();
    }, [tokens])

    return (
        <Box className="markdown-body" key={key} sx={props.sx}>
            {
                tokens.map((token, index) => {
                    return (
                        <MarkdownToken key={index} token={token}/>
                    )
                })
            }
        </Box>
    )
}
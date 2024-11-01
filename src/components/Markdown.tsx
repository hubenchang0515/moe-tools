import { marked, Token, Tokens } from "marked";
import hljs from 'highlight.js';
import 'highlight.js/styles/vs2015.min.css';
import { useEffect, useState } from "react";
import { Alert, Box, Chip, Divider, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, TypographyProps } from "@mui/material";

export interface MarkdownProps {
    text?: string
    url?: string
}

function escapeHTML(text:string) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function unescapeHTML(text:string) {
    const div = document.createElement('div');
    div.innerHTML = text;
    return div.textContent;
}

export function printMarkdown(markdown:string, iframe:HTMLIFrameElement) {
    return new Promise((resolve, reject) => {
        marked.parse(markdown, {async: true}).then((value) => {
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
            return (
                <Typography id={escapeHTML(token.text)} variant={`h${token.depth}` as TypographyProps['variant']}>
                    {
                        token.tokens.map((token,index) => {
                            return <MarkdownToken key={index} token={token}/>
                        })
                    }
                </Typography>
            )
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
            return (
                <Typography variant="body1">
                    {
                        token.tokens.map((item, index) => {
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
                const target = document.getElementById(anchor);
                return (
                    <Link component="button" onClick={()=>{target?.scrollIntoView({behavior:"smooth"})}}>
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
    const [tokens, setTokens] = useState<Token[]>([]);

    useEffect(() => {
        if (props.text !== undefined) {
            const tokens = marked.lexer(props.text);
            setTokens(tokens);
        } else if (props.url) {
            fetch(props.url).then((response) => {
                if (response.ok) {
                    response.text().then((text) => {
                        const tokens = marked.lexer(text);
                        setTokens(tokens);
                    })
                }
            });
        }
    }, [props.text, props.url]);

    useEffect(() => {
        const log = console.log;
        console.log = ()=>{}; // 屏蔽 log
        hljs.highlightAll();
        console.log = log;
    }, [tokens])

    return (
        <Box className="markdown-body">
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
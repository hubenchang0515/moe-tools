import { Box, Button, Collapse, Container, FormControlLabel, Grid2 as Grid, Paper, Switch, SxProps, Theme, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Executor from "../features/Calculator/Executor";
import { useTranslation } from "react-i18next";
import { Root } from "../components/Math";
import Lexer from "../features/Calculator/Lexer";
import Parser from "../features/Calculator/Parser";
import { AstNode, BinaryOperationNode, BracketNode, InvokeNode, NumberNode, SymbolNode, UnaryOperationNode } from "../features/Calculator/Ast";

function NumberRenderer(node:NumberNode|null): JSX.Element|null {
    if (node) {
        return <>{node.value()}</>;
    } else {
        return null
    }
}

function SymbolRenderer(node:SymbolNode|null): JSX.Element|null {
    switch (node?.name()) {
        case 'pi': return <>&pi;</>;
        default: return <>{node?.name()}</>;
    }
}

function UnaryOperationRenderer(node:UnaryOperationNode): JSX.Element {
    switch (node?.operator()) {
        case '+': return <>+{AstNodeRenderer(node.operand())}</>
        case '-': return <>-{AstNodeRenderer(node.operand())}</>
        case '!': return <>{AstNodeRenderer(node.operand())}!</>
    }
}

function BinaryOperationRenderer(node:BinaryOperationNode): JSX.Element {
    switch (node.operator()) {
        case '+': return <>{AstNodeRenderer(node.left())}+{AstNodeRenderer(node.right())}</>
        case '-': return <>{AstNodeRenderer(node.left())}-{AstNodeRenderer(node.right())}</>
        case '*': return <>{AstNodeRenderer(node.left())}&times;{AstNodeRenderer(node.right())}</>
        case '/': return <>{AstNodeRenderer(node.left())}&divide;{AstNodeRenderer(node.right())}</>
        case '^': return <>{AstNodeRenderer(node.left())}<sup>{node.right() ? AstNodeRenderer(node.right()) : 0}</sup></>
        case '√': return <>{Root(AstNodeRenderer(node.right()), AstNodeRenderer(node.left()))}</>
    }
}

function BracketRenderer(node:BracketNode): JSX.Element {
    return <>&#40;{AstNodeRenderer(node.inner())}&#41;</>
}

function InvokeRenderer(node:InvokeNode): JSX.Element {
    const views = {
        'sin': {
            name: 'sin',
            left: '(',
            right: ')',
        },

        'cos': {
            name: 'cos',
            left: '(',
            right: ')',
        },

        'tan': {
            name: 'tan',
            left: '(',
            right: ')',
        },

        'lg': {
            name: 'lg',
            left: '(',
            right: ')',
        },

        'ln': {
            name: 'ln',
            left: '(',
            right: ')',
        },

        'round': {
            name: 'round',
            left: '(',
            right: ')',
        },

        'asin': {
            name: <span>sin<sup>-1</sup></span>,
            left: '(',
            right: ')',
        },

        'acos': {
            name: <span>cos<sup>-1</sup></span>,
            left: '(',
            right: ')',
        },

        'atan': {
            name: <span>tan<sup>-1</sup></span>,
            left: '(',
            right: ')',
        },

        'abs': {
            name: '',
            left: '|',
            right: '|',
        },

        'ceil': {
            name: '',
            left: '⌈',
            right: '⌉',
        },

        'floor': {
            name: '',
            left: '⌊',
            right: '⌋',
        }

    };

    const view = views[node.name() as keyof typeof views];

    return (
        <>
            <>{view.name}</>
            <>{view.left}</>
            {
                node.args().map((item, index) => {
                    return <span key={index}>{AstNodeRenderer(item)}</span>
                })
            }
            <>{view.right}</>
        </>
    )
    
}

function AstNodeRenderer(node:AstNode|null): JSX.Element|null {
    switch (node?.type()) {
        case 'Number': return <>{NumberRenderer(node as NumberNode)}</>;
        case 'Symbol': return <>{SymbolRenderer(node as SymbolNode)}</>;
        case 'UnaryOperation': return <>{UnaryOperationRenderer(node as UnaryOperationNode)}</>;
        case 'BinaryOperation': return <>{BinaryOperationRenderer(node as BinaryOperationNode)}</>;
        case 'Bracket': return <>{BracketRenderer(node as BracketNode)}</>;
        case 'Invoke': return <>{InvokeRenderer(node as InvokeNode)}</>;
        default: return null;
    }

}

function ExpressionRenderer(exp:string): JSX.Element {
    const lexer = new Lexer(exp);
    const tokens = lexer.parse();
    const parser = new Parser(tokens);
    const root = parser.parse();

    if (root) {
        return AstNodeRenderer(root) ?? <></>;
    } else {
        return <></>
    }
}

export default function Calculator() {
    const { t } = useTranslation();

    // SEO
    useEffect(() => {
        document.title = `${t("title")} - ${t("pages.calculator")}`;
        document.querySelector('meta[name="description"]')?.setAttribute("content", t("description.calculator"));
    }, [t]);

    const executor = new Executor;
    const buttonStyle:SxProps<Theme> = {
        textTransform: 'none', 
        width: '100%', 
        height: '100%',
        minWidth: 0,
        paddingX: 0,
        borderRadius: 0,
    };

    const inputRef = useRef<HTMLDivElement>();
    const viewRef = useRef<HTMLDivElement>();
    const resultRef = useRef<HTMLDivElement>();

    const scroll = () => {
        if (inputRef.current) {
            inputRef.current.scrollLeft = inputRef.current.scrollWidth;
        }

        if (viewRef.current) {
            viewRef.current.scrollLeft = viewRef.current.scrollWidth;
        }

        if (resultRef.current) {
            resultRef.current.scrollLeft = resultRef.current.scrollWidth;
        }
    }

    useEffect(scroll);

    const [open, setOpen] = useState(false);

    const [expression, setExpression] = useState<string>("");
    const [result, setResult] = useState<any>("");

    const clear = () => {
        setExpression("");
        setResult("");
    }

    const append = (key:string) => {
        const exp = expression + key;
        setExpression(exp);
        const result = executor.eval(exp);
        setResult(result);
    }

    const del = () => {
        const symbolPattern = /.*?([a-zA-Z_$][a-zA-Z0-9_$]*\(?)$/;
        const matches = symbolPattern.exec(expression);
        if (matches?.length == 2) {
            const exp = expression.slice(0, -matches[1].length);
            setExpression(exp);
            const result = executor.eval(exp);
            setResult(result);
        } else {
            const exp = expression.slice(0, -1);
            setExpression(exp);
            const result = executor.eval(exp);
            setResult(result);
        }
    }

    const calculate = () => {
        const result = executor.eval(expression);
        setExpression(`${result}`);
    }

    return (
        <Container maxWidth="sm" sx={{paddingTop:2}}>
            <Paper sx={{padding:2}}>
                <Box display={'flex'} flexDirection={"column"} gap={1} >
                    <Paper variant="outlined" sx={{boxSizing: 'border-box', paddingX:1, paddingTop:1}}>
                        <Box ref={inputRef} sx={{textWrap:'nowrap', overflowX:'scroll', scrollbarGutter:'stable'}}>
                            <Typography variant="h5">{expression}|</Typography>
                        </Box>
                        <Box ref={viewRef} sx={{textWrap:'nowrap', overflowX:'scroll', scrollbarGutter:'stable'}}>
                            <Typography sx={{textTransform: 'none'}} variant="overline">: {ExpressionRenderer(expression)}</Typography>
                        </Box>
                        <Box ref={viewRef} sx={{textWrap:'nowrap', overflowX:'scroll', scrollbarGutter:'stable'}}>
                            <Typography sx={{textTransform: 'none'}} variant="overline">= {result}</Typography>
                        </Box>
                    </Paper>

                    <FormControlLabel label={t("common.advance")} control={<Switch checked={open} onChange={(_, v)=>setOpen(v)}/>}/>

                    {/* 高级按钮组 */}
                    <Collapse in={open}>
                        <Box>
                            <Grid container columns={3} spacing={1}>
                                <Grid size={1}>
                                    <Button variant="outlined" color="primary" sx={buttonStyle} onClick={()=>append("sin(")}>sin(x)</Button>
                                </Grid>
                                <Grid size={1}>
                                    <Button variant="outlined" color="primary" sx={buttonStyle} onClick={()=>append("cos(")}>cos(x)</Button>
                                </Grid>
                                <Grid size={1}>
                                    <Button variant="outlined" color="primary" sx={buttonStyle} onClick={()=>append("tan(")}>tan(x)</Button>
                                </Grid>

                                <Grid size={1}>
                                    <Button variant="outlined" color="primary" sx={buttonStyle} onClick={()=>append("asin(")}>
                                        <span>sin<sup>-1</sup>(x)</span>
                                    </Button>
                                </Grid>
                                <Grid size={1}>
                                    <Button variant="outlined" color="primary" sx={buttonStyle} onClick={()=>append("acos(")}>
                                        <span>cos<sup>-1</sup>(x)</span>
                                    </Button>
                                </Grid>
                                <Grid size={1}>
                                    <Button variant="outlined" color="primary" sx={buttonStyle} onClick={()=>append("atan(")}>
                                        <span>tan<sup>-1</sup>(x)</span>
                                    </Button>
                                </Grid>

                                <Grid size={1}>
                                    <Button variant="outlined" color="primary" sx={buttonStyle} onClick={()=>append("lg(")}>lg(x)</Button>
                                </Grid>
                                <Grid size={1}>
                                    <Button variant="outlined" color="primary" sx={buttonStyle} onClick={()=>append("ln(")}>ln(x)</Button>
                                </Grid>
                                <Grid size={1}>
                                    <Button variant="outlined" color="primary" sx={buttonStyle} onClick={()=>append("abs(")}>|x|</Button>
                                </Grid>

                                <Grid size={1}>
                                    <Button variant="outlined" color="primary" sx={buttonStyle} onClick={()=>append('^')}>
                                        <span>x<sup>y</sup></span>
                                    </Button>
                                </Grid>
                                <Grid size={1}>
                                    <Button variant="outlined" color="primary" sx={buttonStyle} onClick={()=>append('√')}>
                                        {Root('x', 'y')}
                                    </Button>
                                </Grid>
                                <Grid size={1}>
                                    <Button variant="outlined" color="primary" sx={buttonStyle} onClick={()=>append('!')}>x!</Button>
                                </Grid>

                                <Grid size={1}>
                                    <Button variant="outlined" color="primary" sx={buttonStyle} onClick={()=>append('ceil(')}>⌈x⌉</Button>
                                </Grid>
                                <Grid size={1}>
                                    <Button variant="outlined" color="primary" sx={buttonStyle} onClick={()=>append('floor(')}>⌊x⌋</Button>
                                </Grid>
                                <Grid size={1}>
                                    <Button variant="outlined" color="primary" sx={buttonStyle} onClick={()=>append('round(')}>round(x)</Button>
                                </Grid>

                                <Grid size={1}>
                                    <Button variant="outlined" color="primary" sx={buttonStyle} onClick={()=>append('pi')}>&pi;</Button>
                                </Grid>
                                <Grid size={1}>
                                    <Button variant="outlined" color="primary" sx={buttonStyle} onClick={()=>append('e')}>e</Button>
                                </Grid>
                                <Grid size={1}>
                                    <Button variant="outlined" color="primary" disabled sx={buttonStyle} onClick={()=>append('j')}>j</Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Collapse>

                    {/* 基本按钮组 */}
                    <Box>
                        <Grid container columns={5} spacing={1}>
                            <Grid size={1}>
                                <Button variant="outlined" color="primary" sx={buttonStyle} onClick={()=>append('7')}>7</Button>
                            </Grid>
                            <Grid size={1}>
                                <Button variant="outlined" color="primary" sx={buttonStyle} onClick={()=>append('8')}>8</Button>
                            </Grid>
                            <Grid size={1}>
                                <Button variant="outlined" color="primary" sx={buttonStyle} onClick={()=>append('9')}>9</Button>
                            </Grid>
                            <Grid size={1}>
                                <Button variant="contained" color="warning" sx={buttonStyle} onClick={()=>del()}>DEL</Button>
                            </Grid>
                            <Grid size={1}>
                                <Button variant="contained" color="error" sx={buttonStyle} onClick={clear}>AC</Button>
                            </Grid>

                            <Grid size={1}>
                                <Button variant="outlined" color="primary" sx={buttonStyle} onClick={()=>append('4')}>4</Button>
                            </Grid>
                            <Grid size={1}>
                                <Button variant="outlined" color="primary" sx={buttonStyle} onClick={()=>append('5')}>5</Button>
                            </Grid>
                            <Grid size={1}>
                                <Button variant="outlined" color="primary" sx={buttonStyle} onClick={()=>append('6')}>6</Button>
                            </Grid>
                            <Grid size={1}>
                                <Button variant="contained" color="primary" sx={buttonStyle} onClick={()=>append('*')}>&times;</Button>
                            </Grid>
                            <Grid size={1}>
                                <Button variant="contained" color="primary" sx={buttonStyle} onClick={()=>append('/')}>&divide;</Button>
                            </Grid>

                            <Grid size={1}>
                                <Button variant="outlined" color="primary" sx={buttonStyle} onClick={()=>append('1')}>1</Button>
                            </Grid>
                            <Grid size={1}>
                                <Button variant="outlined" color="primary" sx={buttonStyle} onClick={()=>append('2')}>2</Button>
                            </Grid>
                            <Grid size={1}>
                                <Button variant="outlined" color="primary" sx={buttonStyle} onClick={()=>append('3')}>3</Button>
                            </Grid>
                            <Grid size={1}>
                                <Button variant="contained" color="primary" sx={buttonStyle} onClick={()=>append('+')}>+</Button>
                            </Grid>
                            <Grid size={1}>
                                <Button variant="contained" color="primary" sx={buttonStyle} onClick={()=>append('-')}>-</Button>
                            </Grid>

                            <Grid size={1}>
                                <Button variant="outlined" color="primary" sx={buttonStyle} onClick={()=>append('0')}>0</Button>
                            </Grid>
                            <Grid size={1}>
                                <Button variant="outlined" color="primary" sx={buttonStyle} onClick={()=>append('.')}>.</Button>
                            </Grid>
                            <Grid size={1}>
                                <Button variant="contained" color="secondary" sx={buttonStyle} onClick={()=>append('(')}>(</Button>
                            </Grid>
                            <Grid size={1}>
                                <Button variant="contained" color="secondary" sx={buttonStyle} onClick={()=>append(')')}>)</Button>
                            </Grid>
                            <Grid size={1}>
                                <Button variant="contained" color="success" sx={buttonStyle} onClick={calculate}>=</Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Paper>
        </Container>
    )
}
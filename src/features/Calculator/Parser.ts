import { NumberToken, OperatorToken, SymbolToken, Token } from "./Token";
import { AstNode, BinaryOperationNode, BinaryOperator, BracketNode, InvokeNode, NumberNode, SymbolNode, UnaryOperationNode, UnaryOperator } from "./Ast";

export default class Parser {
    private m_tokens: Token[];
    private m_current: number;

    private next() {
        this.m_current += 1;
    }

    private token(offset:number=0): Token | null {
        if (this.m_current + offset >= 0 && this.m_current + offset < this.m_tokens.length) {
            return this.m_tokens[this.m_current + offset];
        } else {
            return null;
        }
    }

    private parseItem(): AstNode | null {
        if (this.m_current >= this.m_tokens.length) {
            return null;
        }

        const token = this.token()!;
        if (token.type() === 'Number') {
            const left = new NumberNode((token as NumberToken).value());
            this.next();
            const right = this.parseItem();
            if (right) {
                return new BinaryOperationNode('*', left, right);
            } else {
                return new NumberNode((token as NumberToken).value());
            }
        } else if (token.type() === 'Symbol') {
            if (this.token(1)?.type() === 'Operator' && (this.token(1) as OperatorToken).value() === '(') {
                return this.parseInvoke();
            } else {
                this.next();
                return new SymbolNode((token as SymbolToken).value());
            }
        } else if (token.type() === 'Operator' && (token as OperatorToken).value() === '(') {
            this.next();
            const inner = this.parseExpression()!;
            if (this.token()?.type() === 'Operator' && (this.token() as OperatorToken).value() === ')') {
                this.next(); // )
                return new BracketNode(inner);
            } else {
                return new BracketNode(inner, false);
            }
        }

        return null;
    }

    private parseSign():AstNode | null {
        if (this.m_current >= this.m_tokens.length) {
            return null;
        }

        if (this.token()?.type() === 'Operator' && ['+', '-'].includes((this.token() as OperatorToken).value())) {const operator = (this.token() as OperatorToken).value();
            this.next();
            const operand = this.parseItem() || new NumberNode(0);
            
            return new UnaryOperationNode(operator as UnaryOperator, operand);
        }

        return this.parseItem();
    }

    private parseFactorial(): AstNode | null {
        if (this.m_current >= this.m_tokens.length) {
            return null;
        }

        let node = this.parseSign()!;
        let token = this.token();
        while (token && token.type() === 'Operator' && (token as OperatorToken).value() === '!') {
            node = new UnaryOperationNode('!', node);
            this.next();
            token = this.token();
        } 

        return node;
    }

    private parseRoot(): AstNode | null {
        if (this.m_current >= this.m_tokens.length) {
            return null;
        }

        let node = this.parseFactorial();
        let token = this.token();
        while (token && token.type() === 'Operator' && (token as OperatorToken).value() === '√') {
            this.next();
            const right = this.parseRoot()!;
            node = new BinaryOperationNode('√', node ?? new NumberNode(2), right);
            token = this.token();
        } 

        return node;
    }

    private parsePower(): AstNode | null {
        if (this.m_current >= this.m_tokens.length) {
            return null;
        }

        let node = this.parseRoot()!;
        let token = this.token();
        while (token && token.type() === 'Operator' && (token as OperatorToken).value() === '^') {
            this.next();
            const right = this.parseRoot()!;
            node = new BinaryOperationNode('^', node, right);
            token = this.token();
        } 

        return node;
    }

    private parseProduct(): AstNode | null {
        if (this.m_current >= this.m_tokens.length) {
            return null;
        }

        let node = this.parsePower()!;
        let token = this.token();
        while (token && token.type() === 'Operator' && ['*', '/'].includes((token as OperatorToken).value())) {
            const operator = (token as OperatorToken).value() as BinaryOperator;
            this.next();
            const right = this.parsePower()!;
            node = new BinaryOperationNode(operator, node, right);
            token = this.token();
        } 

        return node;
    }

    private parseExpression(): AstNode | null {
        if (this.m_current >= this.m_tokens.length) {
            return null;
        }

        let node = this.parseProduct()!;
        let token = this.token();
        while (token && token.type() === 'Operator' && ['+', '-'].includes((token as OperatorToken).value())) {
            const operator = (token as OperatorToken).value() as BinaryOperator;
            this.next();
            const right = this.parseProduct()!;
            node = new BinaryOperationNode(operator, node, right);
            token = this.token();
        } 

        return node;
    }

    private parseInvoke(): AstNode | null {
        if (this.m_current >= this.m_tokens.length) {
            return null;
        }

        const name = (this.token() as SymbolToken).value();
        const args: AstNode[] = [];
        this.next(); // name
        this.next(); // (
        while (this.token()?.type() !== 'Operator' || (this.token() as OperatorToken).value() !== ')') {
            const arg = this.parseExpression();
            // console.log(2, arg);
            if (arg) {
                args.push(arg);
            } else {
                break;
            }

            if (this.token()?.type() === 'Operator' && (this.token() as OperatorToken).value() === ',') {
                this.next();
            }
        }

        if (this.token()?.type() === 'Operator' && (this.token() as OperatorToken).value() === ')') {
            this.next(); // )
            return new InvokeNode(name, args);
        } else {
            return new InvokeNode(name, args, false);
        }
    }

    constructor(tokens:Token[]=[]) {
        this.m_tokens = tokens;
        this.m_current = 0;
    }

    init(tokens:Token[]) {
        this.m_tokens = tokens;
        this.m_current = 0;
    }

    parse(): AstNode | null {
        return this.parseExpression();
    }
}
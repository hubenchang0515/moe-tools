import { NumberToken, OperatorToken, SymbolToken, Token } from "./Token";

const OPERATORS = ['+', '-', '*', '/', '^', '√', '!', ',', '(', ')', '|'];
const SYMBOL_VALID_CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_1234567890";

export default class Lexer {
    private m_code: string;
    private m_current: number;

    private ch(): string | null {
        if (this.m_current < this.m_code.length) {
            return this.m_code[this.m_current];
        } else {
            return null;
        }
    }
    
    private parseNumber(): number {
        const start = this.m_current;
        let dot = 0;
        while (this.m_current < this.m_code.length) {
            const ch = this.ch()!;
            if (dot > 0 && ch === '.') {
                break; // 多个小数点
            }else if ("1234567890.".includes(ch)) {
                if (ch === '.') {
                    dot += 1;
                }
                this.m_current += 1;
            } else {
                break;
            }
        }
        const end = this.m_current;
        const str = this.m_code.slice(start, end);
        return Number(str);
    }

    private parseSymbol(): string {
        const start = this.m_current;
        while (this.m_current < this.m_code.length) {
            const ch = this.ch()!;
            if (!SYMBOL_VALID_CHARS.includes(ch)) {
                break;
            }
            this.m_current += 1;
        }
        const end = this.m_current;
        const str = this.m_code.slice(start, end);
        return str;
    }

    constructor(code:string="") {
        this.m_code = code;
        this.m_current = 0;
    }

    init(code:string) {
        this.m_code = code;
        this.m_current = 0;
    }

    parse(): Token[] {
        const tokens: Token[] = [];
        while (this.m_current < this.m_code.length) {
            const ch = this.ch()!;
            if ("1234567890".includes(ch)) {
                const value = this.parseNumber();
                const token = new NumberToken(value);
                tokens.push(token);
            } else if (OPERATORS.includes(ch)) {
                this.m_current += 1;
                const token = new OperatorToken(ch);
                tokens.push(token);
            } else if (SYMBOL_VALID_CHARS.includes(ch)) {
                const text = this.parseSymbol();
                const token = new SymbolToken(text);
                tokens.push(token);
            } else {
                this.m_current += 1;
            }
        }
        return tokens
    }
}
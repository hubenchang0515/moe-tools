import { AstNode, BinaryOperationNode, BracketNode, InvokeNode, NumberNode, SymbolNode, UnaryOperationNode } from "./Ast";
import Lexer from "./Lexer";
import Parser from "./Parser";

export default class Executor {
    private m_symbols: Map<string, any>;

    constructor() {
        this.m_symbols = new Map;

        this.m_symbols.set('pi', Math.PI);
        this.m_symbols.set('e', Math.E);

        this.m_symbols.set('sin', Math.sin);
        this.m_symbols.set('cos', Math.cos);
        this.m_symbols.set('tan', Math.tan);
        this.m_symbols.set('asin', Math.asin);
        this.m_symbols.set('acos', Math.acos);
        this.m_symbols.set('atan', Math.atan);
        this.m_symbols.set('ceil', Math.ceil);
        this.m_symbols.set('round', Math.round);
        this.m_symbols.set('floor', Math.floor);
        this.m_symbols.set('pow', Math.pow);
        this.m_symbols.set('lg', Math.log10);
        this.m_symbols.set('ln', Math.log);
        this.m_symbols.set('abs', Math.abs);
    }

    private executeNumber(node:NumberNode): number {
        return node.value();
    }

    private executeUnaryOperation(node:UnaryOperationNode): any {
        switch (node.operator()) {
            case '+': return this.execute(node.operand());
            case '-': return -this.execute(node.operand());
            case '!': {
                let v = this.execute(node.operand());
                if (v < 0) {
                    return null;
                }
                
                let factorial = 1;
                for (; v > 0; v-=1) {
                    factorial *= v
                }
                return factorial;
            }
        }
    }

    private executeBinaryOperation(node:BinaryOperationNode): any {
        const left = node.left();
        const right = node.right();
        const operator = node.operator();

        switch (operator) {
            case '+': return this.execute(left) + this.execute(right);
            case '-': return this.execute(left) - this.execute(right);
            case '*': return this.execute(left) * this.execute(right);
            case '/': return this.execute(left) / this.execute(right);
            case '^': return Math.pow(this.execute(left), this.execute(right));
            case '√': return Math.pow(this.execute(right), 1 / this.execute(left));
        }
    }

    private executeBracket(node:BracketNode): any {
        return this.execute(node.inner());
    }

    private executeSymbol(node:SymbolNode): any {
        return this.m_symbols.get(node.name());
    }

    private executeInvoke(node:InvokeNode): any {
        const func = this.m_symbols.get(node.name());
        const args: any[] = [];
        for (const arg of node.args()) {
            args.push(this.execute(arg));
        }

        try {
            return func(...args);
        } catch {
            return NaN;
        }
        
    }

    execute(node:AstNode): any {
        if (!node) {
            return null;
        }

        switch (node.type()) {
            case 'Number': return this.executeNumber(node as NumberNode);
            case 'UnaryOperation': return this.executeUnaryOperation(node as UnaryOperationNode);
            case 'BinaryOperation': return this.executeBinaryOperation(node as BinaryOperationNode);
            case 'Bracket': return this.executeBracket(node as BracketNode);
            case 'Symbol': return this.executeSymbol(node as SymbolNode);
            case 'Invoke': return this.executeInvoke(node as InvokeNode);
        }
    }

    eval(code:string): any {
        const lexer = new Lexer(code);
        const parser = new Parser(lexer.parse());
        const root = parser.parse();

        if (root){
            return this.execute(root);
        } else {
            return root;
        }
    }
}
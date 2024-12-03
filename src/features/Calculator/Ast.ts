export type AstNodeType = 'Invalid' | 'Number' | 'UnaryOperation' | 'BinaryOperation' | 'Bracket' | 'Symbol' | 'Invoke';

export const UnaryOperators = ['+', '-', '!'] as const;
export type UnaryOperator = typeof UnaryOperators[number];

export const BinaryOperators = ['+', '-', '*', '/', '^', '√'] as const;
export type BinaryOperator = typeof BinaryOperators[number];

export abstract class AstNode {
    private m_type: AstNodeType;
    private m_focus: boolean;
    
    constructor(type:AstNodeType='Invalid') {
        this.m_type = type;
        this.m_focus = false;
    }

    type(): AstNodeType {
        return this.m_type
    }

    focus(): boolean {
        return this.m_focus;
    }

    setFocus(focus:boolean=true) {
        this.m_focus = focus;
    }
}

export class NumberNode extends AstNode {
    private m_value: number;

    constructor(value:number=0) {
        super('Number');
        this.m_value = value;
    }

    value(): number {
        return this.m_value;
    }
}

export class UnaryOperationNode extends AstNode {
    private m_operator: UnaryOperator;
    private m_operand: AstNode;

    constructor(operator:UnaryOperator, operand:AstNode) {
        super('UnaryOperation')
        this.m_operator = operator;
        this.m_operand = operand;
    }

    operator(): UnaryOperator {
        return this.m_operator;
    }

    operand(): AstNode {
        return this.m_operand;
    }
}

export class BinaryOperationNode extends AstNode {
    private m_operator: BinaryOperator;
    private m_left: AstNode;
    private m_right: AstNode;

    constructor(operator:BinaryOperator, left:AstNode, right:AstNode) {
        super('BinaryOperation')
        this.m_operator = operator;
        this.m_left = left;
        this.m_right = right;
    }

    operator(): BinaryOperator {
        return this.m_operator;
    }

    left(): AstNode {
        return this.m_left;
    }

    right(): AstNode {
        return this.m_right;
    }
}

export class BracketNode extends AstNode {
    private m_inner: AstNode;
    private m_end: boolean;

    constructor(inner:AstNode, end:boolean=true) {
        super("Bracket");
        this.m_inner = inner;
        this.m_end = end;
    }

    inner(): AstNode {
        return this.m_inner;
    }

    end(): boolean {
        return this.m_end;
    }
}

export class SymbolNode extends AstNode {
    private m_name: string;

    constructor(name:string) {
        super("Symbol");
        this.m_name = name;
    }

    name() {
        return this.m_name;
    }
}

export class InvokeNode extends AstNode {
    private m_name: string;
    private m_args: AstNode[];
    private m_end: boolean;

    constructor(name:string, args:AstNode[], end:boolean=true) {
        super("Invoke");
        this.m_name = name;
        this.m_args = args;
        this.m_end = end;
    }

    name() {
        return this.m_name;
    }

    end(): boolean {
        return this.m_end;
    }

    nargs(): number {
        return this.m_args.length;
    }

    args(): AstNode[] {
        return this.m_args;
    }

    arg(index:number): AstNode {
        return this.m_args[index];
    }
}
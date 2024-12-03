export type TokenType = 'Invalid' | 'Number' | 'Symbol' | 'Operator';

export abstract class Token {
    private m_type: TokenType;
    private m_focus: boolean;

    constructor(type:TokenType='Invalid') {
        this.m_type = type;
        this.m_focus = false;
    }

    type(): TokenType {
        return this.m_type;
    }

    focus(): boolean {
        return this.m_focus;
    }

    setFocus(focus:boolean=true) {
        this.m_focus = focus;
    }
}

export class NumberToken extends Token {
    private m_value: number;

    constructor(value:number) {
        super('Number');
        this.m_value = value;
    }

    value(): number {
        return this.m_value;
    }
}

export class SymbolToken extends Token {
    private m_value: string;
    
    constructor(value:string) {
        super('Symbol');
        this.m_value = value;
    }

    value(): string {
        return this.m_value;
    }
}

export class OperatorToken extends Token {
    private m_value: string;

    constructor(value:string) {
        super('Operator');
        this.m_value = value;
    }

    value(): string {
        return this.m_value;
    }
}

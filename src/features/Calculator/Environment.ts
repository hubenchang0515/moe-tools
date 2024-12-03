export default class Environment {
    private m_symbols: Map<string, any>;
    
    constructor() {
        this.m_symbols = new Map();
    }

    set(name:string, value:any) {
        this.m_symbols.set(name, value);
    }

    get(name:string): any {
        return this.m_symbols.get(name);
    }
}
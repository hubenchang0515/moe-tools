import Executor from "./Executor";
import Lexer from "./Lexer";
import Parser from "./Parser";

test('Lexer', () => {
    const lexer = new Lexer("2 * sin(ceil(pi) + floor(1+2*j))");
    console.table(lexer.parse());
})

test('Parser', () => {
    const lexer = new Lexer("2 * sin(ceil(pi) + floor(1+2*j)) + pow(2,10|");
    const tokens = lexer.parse();
    console.table(tokens);

    const parser = new Parser(tokens);
    const root = parser.parse();
    console.log(root);
})

test('Executor', () => {
    const executor = new Executor;
    expect(executor.eval('5')).toBe(5)
    expect(executor.eval('1 + 1')).toBe(2);
    expect(executor.eval('√9')).toBe(3);
    expect(executor.eval('3√8')).toBe(2);
    expect(executor.eval('3^6')).toBe(729);
    expect(executor.eval('(3√8 + √9)! + 3^6 - 4pi')).toBe(836.4336293856409);

    expect(executor.eval('sin(0)')).toBeCloseTo(0, 12);
    expect(executor.eval('sin(pi/2)')).toBeCloseTo(1, 12);
    expect(executor.eval('sin(pi)')).toBeCloseTo(0, 12)
    expect(executor.eval('sin(3pi/2)')).toBeCloseTo(-1, 12);

    expect(executor.eval('cos(0)')).toBeCloseTo(1, 12);
    expect(executor.eval('cos(pi/2)')).toBeCloseTo(0, 12);
    expect(executor.eval('cos(pi)')).toBeCloseTo(-1, 12)
    expect(executor.eval('cos(3pi/2)')).toBeCloseTo(0, 12);

    expect(executor.eval('tan(0)')).toBeCloseTo(0, 12);
    expect(executor.eval('tan(pi/4)')).toBeCloseTo(1, 12);
    expect(executor.eval('tan(pi)')).toBeCloseTo(0, 12);

    expect(executor.eval('ceil(pi)')).toBe(4);
    expect(executor.eval('floor(pi)')).toBe(3);
    expect(executor.eval('round(pi)')).toBe(3);

    expect(executor.eval('ceil(e)')).toBe(3);
    expect(executor.eval('floor(e)')).toBe(2);
    expect(executor.eval('round(e)')).toBe(3);
    expect(executor.eval('pow(2, 10)')).toBe(1024);
})
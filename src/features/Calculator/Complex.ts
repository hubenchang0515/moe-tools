export class Complex {
    static negative(v:Complex): Complex {
        return new Complex(-v.m_real, -v.m_imag);
    }

    static add(left:Complex, right:Complex): Complex {
        return new Complex(left.m_real + right.m_real, left.m_imag + right.m_imag);
    }

    static sub(left:Complex, right:Complex): Complex {
        return new Complex(left.m_real - right.m_real, left.m_imag - right.m_imag);
    }

    static mul(left:Complex, right:Complex): Complex {
        return new Complex(left.m_real * right.m_real - left.m_imag * right.m_imag, left.m_real * right.m_imag + left.m_imag * right.m_real);
    }

    static div(left:Complex, right:Complex): Complex {
        const denominator = right.m_real * right.m_real + right.m_imag * right.m_imag;
        const real = (left.m_real * right.m_real + left.m_imag * right.m_imag) / denominator;
        const imag = (left.m_imag * right.m_real - left.m_real * right.m_imag) / denominator;
        return new Complex(real, imag);
    }

    // static pow(base:Complex, index:Complex): Complex {
    //     const r = base
    // }

    private m_real: number;
    private m_imag: number;

    constructor(real:number=0, imag:number=0) {
        this.m_real = real;
        this.m_imag = imag;
    }

    abs():number {
        return Math.sqrt(this.m_real * this.m_real + this.m_imag * this.m_imag);
    }

    arg(): number {
        if (this.m_imag > 0) {
            return Math.acos(this.m_real / this.abs());
        } else if (this.m_imag < 0) {
            return - Math.acos(this.m_real / this.abs());
        } else if (this.m_real > 0) {
            return 0;
        } else {
            return Math.PI;
        }
    }
}
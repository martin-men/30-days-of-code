export class Fraction {
    constructor (numerator, denominator) {
        this.numerator = numerator;
        this.denominator = denominator;
    }

    // Establece el numerador y denominador de la fraccion
    setFraction (numerator, denominator) {
        this.numerator = numerator;
        this.denominator = denominator;
    }

    // Devuelve el numerador de la fraccion
    getNumerator () {
        return this.numerator;
    }

    // Devuelve el denominador de la fraccion
    getDenominator () {
        return this.denominator;
    }

    // Suma dos fracciones
    add (fraction) {
        let num = (this.numerator * fraction.denominator) + (fraction.numerator * this.denominator);
        let den = this.denominator * fraction.denominator;

        return this.simplify(new Fraction(num, den));
    }

    // Resta dos fracciones
    substract (fraction) {
        let num = (this.numerator * fraction.denominator) - (fraction.numerator * this.denominator);
        let den = this.denominator * fraction.denominator;

        return this.simplify(new Fraction(num, den));
    }

    // Multiplica dos fracciones
    multiply (fraction) {
        let num = this.numerator * fraction.numerator;
        let den = this.denominator * fraction.denominator;

        return this.simplify(new Fraction(num, den));
    }

    // Divide dos fracciones
    divide (fraction) {
        let num = this.numerator * fraction.denominator;
        let den = this.denominator * fraction.numerator;

        return this.simplify(new Fraction(num, den));
    }

    // Simplifica la fraccion
    simplify (fraction) {
        let gcd = 1;

        if (fraction.numerator == 0) {
            fraction.denominator = 1;
        }
        if (fraction.numerator == fraction.denominator) {
            fraction.numerator = 1;
            fraction.denominator = 1;
        }
        if ((fraction.numerator < 0) && (fraction.denominator < 0)) {
            fraction.numerator *= -1;
            fraction.denominator *= -1;
        }
        if ((fraction.denominator < 0) && (fraction.numerator > 0)) {
            fraction.numerator *= -1;
            fraction.denominator *= -1;
        }

        gcd = this.gcd(fraction.numerator, fraction.denominator);
        fraction.numerator /= gcd;
        fraction.denominator /= gcd;

        return fraction;
    }

    // Maximo comun divisor
    gcd (a, b) {
        let aux;
        a = Math.abs(a);
        b = Math.abs(b);

        while (b != 0) {
            aux = b;
            b = a % b;
            a = aux;
        }

        return a;
    }

    // Convierte la fraccion a un numero decimal
    toDecimal () {
        return this.numerator / this.denominator;
    }

    // Convierte la fraccion a un string
    toString () {
        return this.numerator + '/' + this.denominator;
    }
}
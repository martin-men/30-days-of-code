export class ExpresionValidation {
    constructor () {
        this.expresionRegEx = /[\w+\-*/^(){}\[\]]+/;
    }

    validateExpresion (expresion) {
        let parenthesysCounter = 0;
        let bracketCounter = 0;
        let curlyBracketCounter = 0;
        // Verifica que la expresion tenga caracteres validos
        if (this.expresionRegEx.test(expresion)) {
            // Verifica que la expresion tenga un numero par de signos de agrupacion
            for (let i = 0; i < expresion.length; i++) {
                if (expresion[i] == '(') {
                    parenthesysCounter++;
                } else if (expresion[i] == ')') {
                    parenthesysCounter--;
                } else if (expresion[i] == '[') {
                    bracketCounter++;
                } else if (expresion[i] == ']') {
                    bracketCounter--;
                } else if (expresion[i] == '{') {
                    curlyBracketCounter++;
                } else if (expresion[i] == '}') {
                    curlyBracketCounter--;
                }
            }
            if ((parenthesysCounter == 0) && (bracketCounter == 0) && (curlyBracketCounter == 0)) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
}

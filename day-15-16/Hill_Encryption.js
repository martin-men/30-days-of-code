import { Fraction } from "./Fraction.js";

export class Hill_Encryption {
    constructor () {
        this.strCharacters = "áéíóúÁÉÍÓÚ.,;:¿?¡!@#$%^&*()_+-=<>[]{}|/\\ABCDEFGHIJKLMNÑOPQRSTUVWXYZ0123456789abcdefghijklmnñopqrstuvwxyz ";
        // Arreglo de caracteres cifrables
        this.arrCharacters = this.strCharacters.split('');
        // Matriz de encripcion 3x3 por defecto
        this.keyMatrix = [[new Fraction(35, 1), new Fraction(53, 1), new Fraction(12, 1)],
        [new Fraction(12, 1), new Fraction(21, 1), new Fraction(5, 1)],
        [new Fraction(2, 1), new Fraction(4, 1), new Fraction(1, 1)]];
    }

    /* Con cada cadena de texto se generara una matriz de 3 filas x n columnas con 
    los valores numericos de cada caracter, los cuales se asignan de acuerdo a la 
    posicion del caracter analizado en el arreglo de caraceteres cifrables. 
    
    La matriz de la cadena de texto debe tener igual o mayor cantidad de espacios 
    que caracteres en la cadena. Si los espacios superan los caracteres, los espacios
    sobrantes se rellenan con caracteres en blanco ' '. 
    
    Para encriptar:
        - Se establece el numero de columnas de la matriz de cadena para que albergue
        el texto.
        - Se guarda el valor numerico de cada caracter al recorrer una por una las
        filas de la matriz de cadena.
        - Matriz de encripcion x Matriz de cadena = Matriz semicriptica
        - Aplicar mod(longitud del arreglo de caracteres cifrables) a cada 
        elemento de la matriz semicriptica = Matriz criptica
        - Se construye una cadena de texto con los caracteres cifrables de acuerdo
        a los valores numericos de cada elemento de la matriz criptica. Se recorren 
        una por una las filas de la matriz.
        - Se retorna la cadena de texto cifrada.

    Para desencriptar:
        - Se establece el numero de columnas de la matriz criptica para que albergue
        el texto cifrado. 
        - Se guarda el valor numerico de cada caracter al recorrer una por una las
        filas de la matriz criptica.
        - Se calcula la matriz inversa de la matriz de encripcion = Matriz de encripcion
        inversa.
        - Si la matriz de encripcion inversa posee fracciones con denominador diferente
        de 1, se calcula el inverso multiplicativo del denominador cada fraccion con respecto 
        al modulo de la longitud del arreglo de caracteres cifrables. Se multiplica el 
        numerador de cada una de estas fracciones por el inverso multiplicativo del denominador
        y se reemplaza el denominador por 1. De esta forma se reemplaza cada fraccion por un 
        numero entero.
        - Aplicar mod(longitud del arreglo de caracteres cifrables) a cada elemento de la
        matriz de encripcion inversa.
        - Matriz de encripcion inversa x Matriz criptica = Matriz semioriginal
        - Aplicar mod(longitud del arreglo de caracteres cifrables) a cada elemento de la 
        matriz semioriginal = Matriz original
        - Se construye una cadena de texto con los caracteres cifrables de acuerdo
        a los valores numericos de cada elemento de la matriz original. Se recorren 
        una por una las filas de la matriz.
        - Se retorna la cadena de texto descifrada. */

    // Encripta una cadena de texto en base a encriptacion Hill
    encrypt (text) {
        let textMatrix = this.storeInMatrix(text);
        let crypticMatrix = this.multiplyMatrix(this.keyMatrix, textMatrix);
        let encriptedText = '', auxNumerator;

        for (let i = 0; i < crypticMatrix.length; i++) {
            for (let j = 0; j < crypticMatrix[i].length; j++) {
                auxNumerator = this.mod(crypticMatrix[i][j].numerator, this.arrCharacters.length);
                crypticMatrix[i][j].setFraction(auxNumerator, crypticMatrix[i][j].denominator);
                encriptedText += this.arrCharacters[crypticMatrix[i][j].numerator];
            }
        }

        return encriptedText;
    }

    // Desencripta una cadena de texto en base a encriptacion Hill
    decrypt (encriptedText) {
        let crypticMatrix = this.storeInMatrix(encriptedText);
        let inverseKeyMatrix = this.inverseMatrix(this.keyMatrix);
        let originalMatrix;
        let decryptedText = '', aux;

        for (let i = 0; i < inverseKeyMatrix.length; i++) {
            for (let j = 0; j < inverseKeyMatrix[i].length; j++) {
                if (inverseKeyMatrix[i][j].denominator != 1) {
                    alert(inverseKeyMatrix[i][j].toString());
                    aux = this.findInverse(
                        inverseKeyMatrix[i][j].denominator, 
                        this.arrCharacters.length
                    );
                    inverseKeyMatrix[i][j].setFraction(
                        inverseKeyMatrix[i][j].numerator * aux,
                        1
                    );
                }
                inverseKeyMatrix[i][j].numerator = this.mod(
                    inverseKeyMatrix[i][j].numerator, 
                    this.arrCharacters.length
                );
            }
        }

        originalMatrix = this.multiplyMatrix(inverseKeyMatrix, crypticMatrix);
        
        for (let i = 0; i < originalMatrix.length; i++) {
            for (let j = 0; j < originalMatrix[i].length; j++) {
                originalMatrix[i][j].numerator = this.mod(
                    originalMatrix[i][j].numerator, this.arrCharacters.length
                );
                decryptedText += this.arrCharacters[originalMatrix[i][j].numerator];
            }
        }

        return decryptedText;
    }

    // Almacena el valor numerico de cada caracter en la matriz de cadena
    storeInMatrix (str) {
        let columns = 1;
        let auxRow = [];
        let strMatrix = [];

        // Se establece el numero de columnas de la matriz de cadena
        while ((columns * 3) < str.length) { columns++; }

        // Se crea la matriz de cadena
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < columns; j++) {
                if (str.length > 0) {
                    auxRow.push(new Fraction(this.arrCharacters.indexOf(str[0]), 1));
                    str = str.substring(1);
                } else {
                    auxRow.push(new Fraction(this.arrCharacters.indexOf(' '), 1));
                }
            }
            strMatrix.push(auxRow);
            auxRow = [];
        }

        return strMatrix;
    }

    // Ejecuta la operacion modula
    mod (num, mod) {
        if (num < 0) {
            num = num * -1;
            if (num < mod) {
                return mod - num;
            } else {
                while (mod < num) {
                    mod += mod;
                }
                return mod - num;
            }
        }

        return num % mod;
    }

    // Multiplica dos matrices
    multiplyMatrix (matrixA, matrixB) {
        if (matrixA[0].length == matrixB.length) { 
            let resultMatrix = [];
            let auxRow = [];
            let acum = new Fraction(0, 1);

            for (let i = 0; i < matrixA.length; i++) {
                for (let j = 0; j < matrixB[0].length; j++) {
                    for (let k = 0; k < matrixB.length; k++) {
                        acum = acum.add(matrixA[i][k].multiply(matrixB[k][j]));
                    }
                    auxRow.push(new Fraction(acum.numerator, acum.denominator));
                    acum.setFraction(0, 1);
                }
                resultMatrix.push(auxRow);
                auxRow = [];
            }

            return resultMatrix;
        }

        return null;
    }

    // Calcula la matriz inversa de una matriz - Metodo de Gauss-Jordan
    inverseMatrix (matrix) {
        let originalMatrix = this.copyMatrix(matrix);
        let inverseMatrix = this.identityMatrix(matrix.length);
        let multiple = new Fraction(0, 1);
        let one = new Fraction(1, 1);
        let minusOne = new Fraction(-1, 1);
        let j = 0;

        for (let i = 0; i < originalMatrix.length; i++) {
            j = i + 1;
            while (j < originalMatrix.length) {
                if (originalMatrix[j][i].numerator != 0) {
                    multiple = originalMatrix[j][i].multiply(minusOne).divide(originalMatrix[i][i]);
                    originalMatrix[j] = this.addRowMultiple(
                        originalMatrix[i], multiple, originalMatrix[j]
                    );
                    inverseMatrix[j] = this.addRowMultiple(
                        inverseMatrix[i], multiple, inverseMatrix[j]
                    );
                }
                j++;
            }
        }
        for (let i = originalMatrix.length - 1; i >= 0; i--) {
            j = i - 1;
            while (j >= 0) {
                if (originalMatrix[j][i].numerator != 0) {
                    multiple = originalMatrix[j][i].multiply(minusOne).divide(originalMatrix[i][i]);
                    originalMatrix[j] = this.addRowMultiple(
                        originalMatrix[i], multiple, originalMatrix[j]
                    );
                    inverseMatrix[j] = this.addRowMultiple(
                        inverseMatrix[i], multiple, inverseMatrix[j]
                    );
                }
                j--;
            }
        }
        for (let i = 0; i < originalMatrix.length; i++) {
            if (originalMatrix[i][i].numerator != originalMatrix[i][i].denominator) {
                multiple = one.divide(originalMatrix[i][i]);
                originalMatrix[i] = this.multiplyRow(originalMatrix[i], multiple);
                inverseMatrix[i] = this.multiplyRow(inverseMatrix[i], multiple);
            }
        }

        return inverseMatrix;
    }

    // Crea una matriz identidad
    identityMatrix (size) {
        let identityMatrix = [];
        let auxRow = [];

        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (i == j) {
                    auxRow.push(new Fraction(1, 1));
                } else {
                    auxRow.push(new Fraction(0, 1));
                }
            }
            identityMatrix.push(auxRow);
            auxRow = [];
        }

        return identityMatrix;
    }

    // Operacion de fila: sumar multiplo de una fila a otra
    addRowMultiple (row, multiple, targetRow) {
        for (let i = 0; i < targetRow.length; i++) {
            targetRow[i] = targetRow[i].add(row[i].multiply(multiple));
        }
        return targetRow;
    }

    // Operaion de fila: multiplicar una fila por un escalar
    multiplyRow (row, scalar) {
        for (let i = 0; i < row.length; i++) {
            row[i] = row[i].multiply(scalar);
        }

        return row;
    }

    // Encuentra el numero inverso de otro segun el modulo
    /* Ejemplo:
    El inverso de 2 en modulo 27 es 14 porque:
    2 * 14 = 28
    28 mod 27 = 1 */
    findInverse (num, mod) {
        if (!(num % mod == 0) && !(mod % num == 0)) {
            let inverse = 1;

            while (this.mod((num * inverse), mod) != 1) {
                if ((num * inverse) > mod) {mod += mod};
                inverse++;
            }
    
            return inverse;
        }

        return 0;
    }

    // Muestra la matriz de encripcion
    getKeyMatrix () {
        let str = '';

        for (let i = 0; i < this.keyMatrix.length; i++) {
            for (let j = 0; j < this.keyMatrix[i].length; j++) {
                str += this.keyMatrix[i][j].toString() + ' ';
            }
            str += '\n';
        }

        return str;
    }

    // Devuelve la copia de una matriz
    copyMatrix (matrix) {
        let copy = [];
        let auxRow = [];

        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                auxRow.push(new Fraction(matrix[i][j].numerator, matrix[i][j].denominator));
            }
            copy.push(auxRow);
            auxRow = [];
        }

        return copy;
    }
}
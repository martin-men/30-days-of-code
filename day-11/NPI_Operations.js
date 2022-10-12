export class NPI_Operations {
    constructor () {
        this.expresions = [];
        this.coefficientRegEx = /[\w#]/;
        this.openAgrupationRegEx = /[(\[{]/;
        this.closeAgrupationRegEx = /[)\]}]/;
        this.operatorsRegEx = /[\^*\/+-]/;
    }

    getNPIExpresion (expresion) {
        return this.decodeExpresion(this.codifyExpresion(expresion));
    }

    codifyExpresion (expresion) {
        let modifiedExpresion = expresion;
        
        // Si existen signos de agrupacion se los codifica primero
        modifiedExpresion = this.codifyInsideAgrupation(modifiedExpresion);

        // Se codifica la expresion segun la prioridad de los operadores
        modifiedExpresion = this.npiExpresionCodification(modifiedExpresion, '^');
        modifiedExpresion = this.npiExpresionCodification(modifiedExpresion, '*');
        modifiedExpresion = this.npiExpresionCodification(modifiedExpresion, '/');
        modifiedExpresion = this.npiExpresionCodification(modifiedExpresion, '+');
        modifiedExpresion = this.npiExpresionCodification(modifiedExpresion, '-');

        return modifiedExpresion;
    }

    decodeExpresion (expresion) {
        // Obtiene la expresion NPI segun su codigo
        // Las ultimas expresiones NPI se encuentran al final del arreglo
        // por lo que se toma el ultimo elemento del arreglo, se usa, y se
        // elimina del arreglo, hasta que el arreglo este vacio
        while (this.expresions.length != 0) {
            expresion = expresion.replace(
                `#${this.expresions.length - 1}#`, this.expresions[this.expresions.length - 1]
            );
            this.expresions.pop();
        }

        return expresion;
    }

    codifyInsideAgrupation (expresion) {
        let auxExpresion = '';
        let auxCounter = 0;
        let openAgrupationCounter = 0;
        let closeAgrupationCounter = 0;
        let agrupationFlag = true;

        // Obtiene los caracteres dentro de signos de agrupacion
        for (let i = 0; i < expresion.length; i++) {
            if (this.openAgrupationRegEx.test(expresion[i])) {
                openAgrupationCounter++;
                auxCounter = i + 1;

                // Permite tratar con signos de agrupacion anidados al contar los signos de 
                //apertura y cierre
                while (agrupationFlag) {
                    if (this.openAgrupationRegEx.test(expresion[auxCounter])) {
                        openAgrupationCounter++;
                    } else if (this.closeAgrupationRegEx.test(expresion[auxCounter])) {
                        closeAgrupationCounter++;
                        if ((openAgrupationCounter == closeAgrupationCounter) && 
                        (this.closeAgrupationRegEx.test(expresion[auxCounter]))) {
                            agrupationFlag = false;
                            break;
                        }
                    }
                    auxExpresion += expresion[auxCounter];
                    auxCounter++;
                }
                if ((auxCounter + 1) < expresion.length) {
                    expresion = expresion.replace(
                        expresion.substring(i, auxCounter + 1), 
                        this.codifyExpresion(auxExpresion)
                    );
                } else {
                    expresion = expresion.replace(
                        expresion.substring(i), this.codifyExpresion(auxExpresion)
                    );
                }
                auxExpresion = '';
                openAgrupationCounter = 0;
                closeAgrupationCounter = 0;
                agrupationFlag = true;
                i = 0;
            }
        }

        return expresion;
    }

    getCoefficients (expresion, operatorIndex) {
        let auxCounter = 0;
        let leftSubExpresion = '';
        let rightSubExpresion = '';
        // Obtener el coeficiente izquierdo
        auxCounter = operatorIndex - 1;

        while ((this.coefficientRegEx.test(expresion[auxCounter])) && 
        (expresion[auxCounter] != undefined)) {
            leftSubExpresion = expresion[auxCounter] + leftSubExpresion;
            auxCounter--;
        }
        // Obtener el coeficiente derecho
        auxCounter = operatorIndex + 1;
        
        while ((this.coefficientRegEx.test(expresion[auxCounter])) && 
        (expresion[auxCounter] != undefined)) {
            rightSubExpresion += expresion[auxCounter];
            auxCounter++;
        }

        return [leftSubExpresion, rightSubExpresion];
    }

    getCodifiedExpresion (expresion) {
        // Agrega la sub-expresion NPI al arreglo de expresiones
        this.expresions.push(expresion);
        // Retorna el codigo de la sub-expresion NPI, segun su 
        // posicion en el arreglo de expresiones
        return `#${this.expresions.indexOf(expresion)}#`;
    }

    npiExpresionCodification (expresion, operator) {
        let subExpresions = [];
        let auxExpresion = '';
        let originalExpresion = '';
        
        for (let i = 0; i < expresion.length; i++) {
            if (expresion[i] === operator) {
                // Obtener los coeficientes de la expresion
                subExpresions = this.getCoefficients(expresion, i);
                // Reordenar segun NPI
                auxExpresion = `${subExpresions[0]} ${subExpresions[1]} ${operator}`;
                // Armar la expresion original
                originalExpresion = subExpresions[0] + operator + subExpresions[1];
                // Reemplazar la expresion original por la codificada
                expresion = expresion.replace(
                    originalExpresion, 
                    this.getCodifiedExpresion(auxExpresion)
                );
                i = 0;
            }
        }

        return expresion;
    }
}
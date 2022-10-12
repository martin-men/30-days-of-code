import { NPI_Operations } from "./NPI_Operations.js";
import { ExpresionValidation } from "./ExpresionValidation.js";

let npiOperations = new NPI_Operations();
let expresionValidation = new ExpresionValidation();
let flag = true, opt, expresion = '';

while (flag) {
    opt = prompt('Ingrese una opcion: \n 1. Obtener expresion en NPI \n 2. Salir');

    switch (opt) {
        case '1':
            expresion = prompt('Ingrese la expresion a convertir: ');
            expresion = expresion.split(' ').join('');

            if (expresionValidation.validateExpresion(expresion)) {
                alert('La expresion en NPI es: \n' + npiOperations.getNPIExpresion(expresion));
            } else {
                alert('Expresion no valida');
            }
            break;
        case '2':
            flag = false;
            break;
        default:
            alert('Opcion no valida');
            break;
    }
}

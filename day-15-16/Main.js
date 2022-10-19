import { Hill_Encryption } from './Hill_Encryption.js';

let hill = new Hill_Encryption();
let flag = true, opt, str;

while (flag) {
    opt = prompt('1. Encriptar\n2. Desencriptar\n3. Mostrar llave\n4. Salir');

    switch (opt) {
        case '1':
            str = prompt('Ingrese el texto a encriptar:');
            alert('Texto encriptado: ' + hill.encrypt(str));
            break;

        case '2':
            str = prompt('Ingrese el texto a desencriptar:');
            alert('Texto desencriptado: ' + hill.decrypt(str));
            break;

        case '3':
            alert(hill.getKeyMatrix());
            break;

        case '4':
            flag = false;
            break;

        default:
            alert('Opcion invalida');
            break;
    }
}
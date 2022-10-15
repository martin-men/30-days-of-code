import { Vigenere_Encryption } from "./Vigenere_Encryption.js";

let vigenere = new Vigenere_Encryption();
let flag = true, opt = 0, message = '', cryptogram = '', key = '', shortKey = '';

while (flag) {
    opt = prompt('1. Encriptar\n' + 
        '2. Desencriptar\n' + 
        '3. Obtener clave corta\n' + 
        '4. Desencriptar con clave corta\n' + 
        '5. Salir\n');

    switch (opt) {
        case '1':
            message = prompt('Ingrese el mensaje a encriptar:');
            cryptogram = vigenere.encrypt(message);
            console.log(`Mensaje encriptado: ${cryptogram[0]}\nClave: ${cryptogram[1]}`);
            break;

        case '2':
            message = prompt('Ingrese el mensaje a desencriptar:');
            key = prompt('Ingrese la clave:');
            console.log(`Mensaje desencriptado: ${vigenere.decrypt(message, key)}`);
            break;

        case '3':
            message = prompt('Ingrese el mensaje encriptado:');
            key = prompt('Ingrese la clave:');
            cryptogram = vigenere.getShortKey(message, key);
            console.log(`Nuevo mensaje encriptado: ${cryptogram[0]}\nClave corta: ${cryptogram[1]}`);
            break;

        case '4':
            message = prompt('Ingrese el mensaje encriptado:');
            shortKey = prompt('Ingrese la clave corta:');
            console.log(`Mensaje desencriptado: ${vigenere.decryptShortKey(message, shortKey)}`);
            break;

        case '5':
            flag = false;
            break;

        default:
            alert('Opción inválida');
            break;
    }

}
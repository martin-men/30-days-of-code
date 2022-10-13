import { Cesar_Encryption } from "./Cesar_Encryption.js";

let cesarEncryption = new Cesar_Encryption();
let flag = true, opt, text, key;

while (flag) {
    opt = prompt('//////////// Encriptador Cesar ////////////\n' + 
        '1. Encriptar texto\n' +
        '2. Desencriptar texto\n' +
        '3. Salir\n');
    
    switch (opt) {
        case '1':
            text = prompt('Ingrese el texto a encriptar:');
            key = Number(prompt('Ingrese la llave:'));

            if (key > 0) {
                alert(cesarEncryption.encrypt(text, key));
            } else {
                alert('La llave debe ser un número positivo mayor a 0');
            }
            break;

        case '2':
            text = prompt('Ingrese el texto a desencriptar:');
            key = Number(prompt('Ingrese la llave:'));

            if (key > 0) {
                alert(cesarEncryption.decrypt(text, key));
            } else {
                alert('La llave debe ser un número positivo mayor a 0');
            }
            break;

        case '3':
            flag = false;
            break;

        default:
            alert('Opción inválida');
            break;
    }
}
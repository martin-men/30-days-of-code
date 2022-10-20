const CryptoJS = require("crypto-js");

let flag = true, opt, text, passphrase;

while (flag) {
    opt = prompt('------ ENCRIPTACION AES (ADVANCED ENCRYPTION STANDARD) ------\n' + 
    '1. Encriptar\n' +
    '2. Desencriptar\n' +
    '3. Salir\n');

    switch (opt) {
        case '1':
            text = prompt('Ingrese el texto a encriptar: ');
            passphrase = prompt('Ingrese la clave: ');
            alert('Texto encriptado: ' + CryptoJS.AES.encrypt(text, passphrase).toString());
            break;
        
        case '2':
            text = prompt('Ingrese el texto a desencriptar: ');
            passphrase = prompt('Ingrese la clave: ');
            alert('Texto desencriptado: ' + CryptoJS.AES.decrypt(text, passphrase).toString(CryptoJS.enc.Utf8));
            break;

        case '3':
            flag = false;
            break;

        default:
            alert('Opcion no valida');
            break;
    }
}


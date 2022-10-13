export class Cesar_Encryption {
    constructor () {}

    // Encripta texto con el algoritmo Cesar
    encrypt (text, key) {
        // Se obtiene cada caracter del texto
        let textArray = text.split('');
        let replacement = '';

        // Se recorre cada caracter del texto
        for (let i = 0; i < textArray.length; i++) {
            // Se obtiene su reemplazo en base al
            // código UTF-16 y la llave
            replacement = String.fromCharCode(
                textArray[i].charCodeAt(0) + key
            );
            // Se reemplaza el caracter
            textArray[i] = replacement;
        }

        return textArray.join('');
    }

    // Desencripta texto en base al algoritmo Cesar
    decrypt (encriptedText, key) {
        // Se obtiene cada caracter del texto
        let textArray = encriptedText.split('');
        let replacement = '';

        // Se recorre cada caracter del texto
        for (let i = 0; i < textArray.length; i++) {
            // Se obtiene el caracter original en base al
            // código UTF-16 y la llave
            replacement = String.fromCharCode(
                textArray[i].charCodeAt(0) - key
            );
            // Se reemplaza el caracter
            textArray[i] = replacement;
        }

        return textArray.join('');
    }
}
export class Vigenere_Encryption {
    constructor() {
        this.strCharacters = "áéíóúÁÉÍÓÚ.,;:¿?¡!@#$%^&*()_+-=<>[]{}|/\\ABCDEFGHIJKLMNÑOPQRSTUVWXYZ0123456789abcdefghijklmnñopqrstuvwxyz ";
        this.arrCharacters = this.strCharacters.split('');
    }

    // Para encriptar los mensajes se usa la formula matematica
    // ci = (xi + yi) mod n, donde:

    // ci = valor numerico del i-esimo caracter encriptado
    // xi = valor numerico del i-esimo caracter del mensaje
    // yi = valor numerico del i-esimo caracter de la clave 
    // n = numero total de caracteres

    // Para desencriptar los mensajes se usa la formula matematica
    // xi = (ci - yi) mod n.

    // El valor numerico corresponde a la posicion del caracter 
    // en la cadena de caracteres de esta clase, con su primer
    // valor igual a 0.

    // Encripta un mensaje usando el cifrado de Vigenere al generar
    // automaticamente una clave aleatoria de 27 caracteres.
    encrypt(message) {        
        // Se obtiene la clave aleatoria
        let key = this.getKey(message), resizedKey = '';
        let encryptedMessage = '', replacementIndex = 0;

        // Si mensaje y clave no coinciden en tamaño, se modifica
        // la clave
        if (message.length != key.length) {
            resizedKey = this.resizeKey(message, key);
        } else {
            resizedKey = key;
        }
        // Se encripta el mensaje con la formula dada
        for (let i = 0; i < message.length; i++) {
            replacementIndex = (this.arrCharacters.indexOf(message[i]) + 
                                this.arrCharacters.indexOf(resizedKey[i])) % 
                                this.arrCharacters.length;
            encryptedMessage += this.arrCharacters[replacementIndex];
        }

        return [encryptedMessage, key];
    }

    // Desencripta un mensaje usando el cifrado de Vigenere
    decrypt(encryptedMessage, key) {
        let decryptedMessage = '', replacementIndex = 0;

        // Si mensaje y clave no coinciden en tamaño, se modifica
        // la clave
        if (encryptedMessage.length != key.length) {
            key = this.resizeKey(encryptedMessage, key);
        }
        // Se desencripta el mensaje con la formula dada
        for (let i = 0; i < encryptedMessage.length; i++) {
            replacementIndex = (this.arrCharacters.indexOf(encryptedMessage[i]) - 
                                this.arrCharacters.indexOf(key[i])) % 
                                this.arrCharacters.length;
            if (replacementIndex < 0) {
                replacementIndex = this.arrCharacters.length - 
                                    ((this.arrCharacters.indexOf(encryptedMessage[i]) - 
                                    this.arrCharacters.indexOf(key[i])) * -1);
            }
            decryptedMessage += this.arrCharacters[replacementIndex];
        }

        return decryptedMessage;
    }
    
    // Genera una clave aleatoria de 27 caracteres
    getKey() {
        let randNumber = 0, key = '';

        for (let i = 0; i < 27; i++) {
            randNumber = Math.floor(
                            Math.random() * this.arrCharacters.length
                        );
            key += this.arrCharacters[randNumber];
        }

        return key;
    }

    // Modifica la clave para que tenga el mismo tamaño 
    // que el mensaje
    resizeKey(message, key) {
        let auxCounter = 0;

        if (message.length > key.length) {
            while (key.length < message.length) {
                key += key[auxCounter];
                auxCounter++;
            }
        } else {
            key = key.substring(0, message.length);
        }

        return key;
    }

    // Para no tener que usar la clave en su totalidad para obtener
    // el mensaje original, se plantea insertar la clave en el mensaje.
    // Esto se hara de tal forma que cada caracter de la clave se encuentre a
    // k - 1 caracteres de distancia, donde k es una numero obtenido de forma
    // aleatoria entre 1 y un decimo de la longitud del mensaje. Si el indice
    // en el que se quiere insertar el caracter de la clave es mayor que la
    // longitud del mensaje, se insertan los caracteres restantes de la clave al
    // final desde el ultimo de ellos.

    // Ejemplos:
    // Mensaje encriptado: "############"
    // Clave: "abcde"
    // k = 2
    // Mensaje con clave insertada: "##a#b#c#d#e######"
    // Indices de insercion: 2, 4, 6, 8, 10

    // Mensaje encriptado: "######"
    // Clave: "abcdefgh"
    // k = 2
    // Mensaje con clave insertada: "##a#b#c#d#hgfe"
    // Indices de insercion: 2, 4, 6, 8, 10

    // La clave corta se conforma por: 
    // {k}-{ultimo indice de insercion intermedio}-
    // {longitud de la clave}-{longitud del mensaje encriptado}

    // Genera una clave corta y el nuevo mensaje encriptado
    getShortKey(message, key) {
        let shortKey = Math.floor(
                        Math.random() * (message.length / 10)
                    ) + 1;
        let lastNormalIndex = 0;
        let normalIndex = shortKey;
        let messageArray = message.split('');
        let auxCounter = 0, overflowIndex = key.length - 1;

        while (auxCounter < key.length) {
            if (normalIndex > message.length - 1) {
                lastNormalIndex = normalIndex - shortKey;
                messageArray.push(key[overflowIndex]);
                overflowIndex--;
            } else {
                messageArray.splice(normalIndex, 0, key[auxCounter]);
                normalIndex += shortKey;
            }
            auxCounter++;
        }

        return [messageArray.join(''), `${shortKey}-${lastNormalIndex}-`+
                                        `${key.length}-${message.length}`];
    }

    // Obtiene el mensaje original a partir del mensaje con la clave
    // insertada y la clave corta.
    decryptShortKey(messageWithKey, shortKey) {
        let arrMessageWithKey = messageWithKey.split('');
        let arrShortKey = shortKey.split('-');
        let key = '', keyCounter = 0, messageCounter = 0;
        let originalEncryptedMessage = arrMessageWithKey[0];

        // Se obtiene la clave en los indices que se insertaron y el 
        // mensaje encriptado original
        
        // Si es que no se insertaron caracteres de la clave al final
        if (arrShortKey[1] == 0) {
            for (let i = 1; i < arrMessageWithKey.length; i++) {
                if (i % Number(arrShortKey[0]) == 0) {
                    key += arrMessageWithKey[i];
                    keyCounter++;
                } else {
                    originalEncryptedMessage += arrMessageWithKey[i];
                }
            }
        // Si es que se insertaron caracteres de la clave al final
        } else {
            for (let i = 1; i < arrMessageWithKey.length; i++) {
                if ((i % Number(arrShortKey[0]) == 0) && (i <= Number(arrShortKey[1]))) {
                    key += arrMessageWithKey[i];
                    keyCounter++;
                } else if (messageCounter < Number(arrShortKey[3])) {
                    originalEncryptedMessage += arrMessageWithKey[i];
                    messageCounter++;
                }
            }
        }
        // Se obtiene el resto de la clave insertada al final
        while (keyCounter < Number(arrShortKey[2])) {
            key += arrMessageWithKey.pop();
            keyCounter++;
        }
        
        // Se devuelve el mensaje original
        return this.decrypt(originalEncryptedMessage, key);
    }
}
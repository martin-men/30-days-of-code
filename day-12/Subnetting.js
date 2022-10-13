export class Subnetting {
    constructor () {
        // A cada valor de octeto se le asigna un numero de bits de host
        this.octetValues = ['0', '128', '192', '224', '240', '248', '252', '254', '255'];
        this.octetHostBits = [8, 7, 6, 5, 4, 3, 2, 1, 0];
    }

    // Obtiene el numero de hosts para cierta mascara
    getHosts (mask) {
        let maskArray = mask.split('.');
        let hostBits = 0;

        // Se obtiene el numero de bits de host total
        for (let i = 0; i < maskArray.length; i++) {
            hostBits += this.octetHostBits[this.octetValues.indexOf(maskArray[i])];
        }

        // Se retorna el numero de hosts
        return ((Math.pow(2, hostBits)) - 2);
    }

    // Obtiene la mascara para cierto numero de hosts
    getMask (hosts) {
        let maskArray = [];
        let hostBits = 0, possibleHosts = 0, wholeHostOctets = 0;

        // Se obtiene el numero de bits de host total
        while (hosts > possibleHosts) {
            hostBits++;
            possibleHosts = (Math.pow(2, hostBits)) - 2;
        }

        wholeHostOctets = Math.floor(hostBits / 8);

        // Se obtienen los octetos de la mascara
        for (let i = 0; i < wholeHostOctets; i++) {
            // Se agrega un 0 a la derecha por cada 8 bits de host
            maskArray.push('0');
        }
        if (maskArray.length < 4) {
            // Se agrega el valor de octeto correspondiente al numero
            // de bits de host restantes
            maskArray.unshift(this.octetValues[
                this.octetHostBits.indexOf(hostBits - (wholeHostOctets * 8))
            ]);
            // Se agrega 255 a la izquierda de la mascara si aun no
            // se ha llegado a 4 octetos
            while (maskArray.length < 4) {
                maskArray.unshift('255');
            }
        }

        return (maskArray.join('.'));
    }

    // Obtiene la clase de red segun el numero de hosts
    getClassHosts (hosts) {
        if (hosts <= 0) {
            return 'Experimental';
        } else if (hosts <= 254) {
            return 'C';
        } else if (hosts <= 65534) {
            return 'B';
        } else if (hosts <= 16777214) {
            return 'A';
        } else {
            return 'Indefinida';
        }
    }

    // Obtiene la clase de red segun una mascara dada
    getClassMask (mask) {
        let maskArray = mask.split('.');
        let networkOctets = 0;

        // Se obtiene el numero de octetos de red
        for (let i = 0; i < maskArray.length; i++) {
            if (maskArray[i] === '255') {
                networkOctets++;
            }
        }
        switch (networkOctets) {
            case 0: return 'Indefinida';
            case 1: return 'A';
            case 2: return 'B';
            case 3: return 'C';
            default: return 'Experimental';
        }
    }
}
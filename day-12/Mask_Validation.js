export class Mask_Validation {
    constructor () {
        this.octets = [];
        this.maskRegExp = /^(0|128|192|224|240|248|252|254|255)\.(0|128|192|224|240|248|252|254|255)\.(0|128|192|224|240|248|252|254|255)\.(0|128|192|224|240|248|252|254|255)$/;
    }

    // Valida la mascara de red
    validateMask (mask) {
        // Se verifica el formato y valores de cada octeto
        if (this.maskRegExp.test(mask)) {
            // Se separan los octetos de la mascara
            this.octets = mask.split('.');
            // Si un octeto es distinto de 255, lo siguientes deben ser  
            // y los anteriores deben ser 255
            for (let i = 0; i < this.octets.length; i++) {
                if (this.octets[i] !== '255') {
                    // Si el contador esta en el ultimo octeto, solo
                    // revisar los anteriores
                    if (i == this.octets.length - 1) {
                        return this.verifyPreviousOctets(i);
                    // Si el contador esta en el primer octeto, solo
                    // revisar los siguientes
                    } else if (i == 0) {
                        return this.verifyNextOctets(i);
                    } else {
                    // Si el contador esta en un octeto intermedio, revisar
                    // los anteriores y siguientes
                        return (this.verifyPreviousOctets(i) && 
                        this.verifyNextOctets(i));
                    }
                }
            }

            return true;
        } else {
            return false;
        }
    }

    // Verifica que los octetos anteriores al actual sean 255
    verifyPreviousOctets (octetIndex) {
        let auxCounter = octetIndex - 1;

        while (auxCounter >= 0) {
            if (this.octets[auxCounter] !== '255') {
                return false;
            }
            auxCounter--;
        }

        return true;
    }

    // Verifica que los octetos siguientes al actual sean 0
    verifyNextOctets (octetIndex) {
        let auxCounter = octetIndex + 1;

        while (auxCounter < this.octets.length) {
            if (this.octets[auxCounter] !== '0') {
                return false;
            }
            auxCounter++;
        }

        return true;
    }
}